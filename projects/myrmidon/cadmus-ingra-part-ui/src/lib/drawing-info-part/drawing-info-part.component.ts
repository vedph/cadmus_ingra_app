import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';

import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { NgToolsValidators } from '@myrmidon/ng-tools';
import { HistoricalDateModel } from '@myrmidon/cadmus-refs-historical-date';
import { Flag, FlagsPickerAdapter } from '@myrmidon/cadmus-ui-flags-picker';

import {
  DrawingInfoPart,
  DRAWING_INFO_PART_TYPEID,
  TaggedId,
} from '../drawing-info-part';

function entryToFlag(entry: ThesaurusEntry): Flag {
  return {
    id: entry.id,
    label: entry.value,
  };
}

/**
 * DrawingInfo editor component.
 * Thesauri: drawing-subjects (required); drawing-colors,
 * link-reasons (all optional).
 */
@Component({
  selector: 'ingra-drawing-info-part',
  templateUrl: './drawing-info-part.component.html',
  styleUrls: ['./drawing-info-part.component.css'],
})
export class DrawingInfoPartComponent
  extends ModelEditorComponentBase<DrawingInfoPart>
  implements OnInit
{
  private _dsEntries: ThesaurusEntry[];
  private readonly _flagAdapter: FlagsPickerAdapter;

  public subjects: FormControl<Flag[]>;
  public description: FormControl<string | null>;
  public color: FormControl<string | null>;
  public date: FormControl<HistoricalDateModel | null>;
  public links: FormArray;

  public subjectFlags$: Observable<Flag[]>;

  // drawing-subjects
  @Input()
  public get dsEntries(): ThesaurusEntry[] | undefined {
    return this._dsEntries;
  }
  public set dsEntries(value: ThesaurusEntry[] | undefined) {
    if (this._dsEntries === value) {
      return;
    }
    this._dsEntries = value || [];
    this._flagAdapter.setSlotFlags(
      'subjects',
      this._dsEntries.map(entryToFlag)
    );
  }

  // drawing-colors
  public dcEntries: ThesaurusEntry[] | undefined;
  // link-reasons
  public dlEntries: ThesaurusEntry[] | undefined;

  public colorFlags: Flag[];

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  constructor(authService: AuthJwtService, private _formBuilder: FormBuilder) {
    super(authService, _formBuilder);
    this.colorFlags = [];
    this._dsEntries = [];
    // flags
    this._flagAdapter = new FlagsPickerAdapter();
    this.subjectFlags$ = this._flagAdapter.selectFlags('subjects');
    // form
    this.subjects = _formBuilder.control([], {
      validators: NgToolsValidators.strictMinLengthValidator(1),
      nonNullable: true,
    });
    this.description = _formBuilder.control(null, Validators.maxLength(1000));
    this.color = _formBuilder.control(null, Validators.maxLength(50));
    this.date = _formBuilder.control(null);
    this.links = _formBuilder.array([]);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      subjects: this.subjects,
      description: this.description,
      color: this.color,
      date: this.date,
      links: this.links,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    let key = 'drawing-subjects';
    if (this.hasThesaurus(key)) {
      this.dsEntries = thesauri[key].entries;
      this.colorFlags = this.dsEntries!.map((e) => {
        return { id: e.id, label: e.value } as Flag;
      });
    } else {
      this.dsEntries = undefined;
      this.colorFlags = [];
    }

    key = 'drawing-colors';
    if (this.hasThesaurus(key)) {
      this.dcEntries = thesauri[key].entries;
    } else {
      this.dcEntries = undefined;
    }

    key = 'link-reasons';
    if (this.hasThesaurus(key)) {
      this.dlEntries = thesauri[key].entries;
    } else {
      this.dlEntries = undefined;
    }
  }

  private updateForm(part?: DrawingInfoPart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.subjects.setValue(
      this._flagAdapter.setSlotChecks('subjects', part.subjects)
    );
    this.description.setValue(part.description);
    this.color.setValue(part.color || null);
    this.date.setValue(part.date || null);
    this.links.clear();
    if (part.links) {
      for (let l of part.links) {
        this.links.controls.push(this.getLinkGroup(l));
      }
    }
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<DrawingInfoPart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): DrawingInfoPart {
    let part = this.getEditedPart(DRAWING_INFO_PART_TYPEID) as DrawingInfoPart;
    (part.subjects =
      this._flagAdapter.getOptionalCheckedFlagIds('subjects') || []),
      (part.description = this.description.value || '');
    part.color = this.color.value || undefined;
    part.date = this.date.value || undefined;
    part.links = this.getLinks();

    return part as DrawingInfoPart;
  }

  private getLinkGroup(link?: TaggedId): FormGroup {
    return this._formBuilder.group({
      id: this._formBuilder.control(link?.id, [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[-a-zA-Z0-9_]+$'),
      ]),
      tag: this._formBuilder.control(link?.tag, Validators.maxLength(50)),
    });
  }

  public addLink(item?: TaggedId): void {
    this.links.push(this.getLinkGroup(item));
    this.links.markAsDirty();
  }

  public removeLink(index: number): void {
    this.links.removeAt(index);
    this.links.markAsDirty();
  }

  public moveLinkUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.links.controls[index];
    this.links.removeAt(index);
    this.links.insert(index - 1, item);
    this.links.markAsDirty();
  }

  public moveLinkDown(index: number): void {
    if (index + 1 >= this.links.length) {
      return;
    }
    const item = this.links.controls[index];
    this.links.removeAt(index);
    this.links.insert(index + 1, item);
    this.links.markAsDirty();
  }

  private getLinks(): TaggedId[] | undefined {
    const entries: TaggedId[] = [];
    for (let i = 0; i < this.links.length; i++) {
      const g = this.links.at(i) as FormGroup;
      entries.push({
        id: g.controls.id.value?.trim(),
        tag: g.controls.tag.value?.trim(),
      });
    }
    return entries.length ? entries : undefined;
  }

  public onSubjectFlagsChange(flags: Flag[]): void {
    this.subjects.setValue(flags);
  }

  public onDateChange(date: HistoricalDateModel): void {
    this.date.setValue(date);
  }
}
