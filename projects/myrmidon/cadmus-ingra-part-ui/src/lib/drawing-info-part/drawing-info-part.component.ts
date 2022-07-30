import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
} from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { CadmusValidators, ThesaurusEntry } from '@myrmidon/cadmus-core';

import {
  DrawingInfoPart,
  DRAWING_INFO_PART_TYPEID,
  TaggedId,
} from '../drawing-info-part';
import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { deepCopy } from '@myrmidon/ng-tools';
import { HistoricalDateModel } from '@myrmidon/cadmus-refs-historical-date';

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
  public subjects: FormControl<string[]>;
  public description: FormControl<string | null>;
  public color: FormControl<string | null>;
  public date: FormControl<HistoricalDateModel | null>;
  public links: FormArray;

  // drawing-subjects
  public dsEntries: ThesaurusEntry[] | undefined;
  // drawing-colors
  public dcEntries: ThesaurusEntry[] | undefined;
  // link-reasons
  public dlEntries: ThesaurusEntry[] | undefined;

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  constructor(authService: AuthJwtService, private _formBuilder: FormBuilder) {
    super(authService);
    // form
    this.subjects = _formBuilder.control([], {
      validators: CadmusValidators.strictMinLengthValidator(1),
      nonNullable: true,
    });
    this.description = _formBuilder.control(null, Validators.maxLength(1000));
    this.color = _formBuilder.control(null, Validators.maxLength(50));
    this.date = _formBuilder.control(null);
    this.links = _formBuilder.array([]);
    this.form = _formBuilder.group({
      subjects: this.subjects,
      description: this.description,
      color: this.color,
      date: this.date,
      links: this.links,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: DrawingInfoPart): void {
    if (!model) {
      this.form?.reset();
      return;
    }
    this.subjects.setValue(model.subjects || []);
    this.description.setValue(model.description);
    this.color.setValue(model.color || null);
    this.date.setValue(model.date || null);
    this.links.clear();
    if (model.links) {
      for (let l of model.links) {
        this.links.controls.push(this.getLinkGroup(l));
      }
    }
    this.form?.markAsPristine();
  }

  protected onModelSet(model: DrawingInfoPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'drawing-subjects';
    if (this.thesauri && this.thesauri[key]) {
      this.dsEntries = this.thesauri[key].entries;
    } else {
      this.dsEntries = undefined;
    }

    key = 'drawing-colors';
    if (this.thesauri && this.thesauri[key]) {
      this.dcEntries = this.thesauri[key].entries;
    } else {
      this.dcEntries = undefined;
    }

    key = 'link-reasons';
    if (this.thesauri && this.thesauri[key]) {
      this.dlEntries = this.thesauri[key].entries;
    } else {
      this.dlEntries = undefined;
    }
  }

  protected getModelFromForm(): DrawingInfoPart {
    let part = this.model;
    if (!part) {
      part = {
        itemId: this.itemId || '',
        id: '',
        typeId: DRAWING_INFO_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: '',
        timeModified: new Date(),
        userId: '',
        description: '',
        subjects: [],
      };
    }
    part!.subjects = this.subjects.value;
    part!.description = this.description.value || '';
    part!.color = this.color.value || undefined;
    part!.date = this.date.value || undefined;
    part!.links = this.getLinks();

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

  public onSubjectSelectionChange(ids: string[]): void {
    this.subjects.setValue(ids || []);
  }

  public onDateChange(date: HistoricalDateModel): void {
    this.date.setValue(date);
  }
}
