import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';

import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';

import {
  GraffitiInfoPart,
  GRAFFITI_INFO_PART_TYPEID,
  RankedId,
} from '../graffiti-info-part';
import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { HistoricalDateModel } from '@myrmidon/cadmus-refs-historical-date';

/**
 * GraffitiInfo editor component.
 * Thesauri: graffiti-languages, graffiti-verses (all optional).
 */
@Component({
  selector: 'ingra-graffiti-info-part',
  templateUrl: './graffiti-info-part.component.html',
  styleUrls: ['./graffiti-info-part.component.css'],
})
export class GraffitiInfoPartComponent
  extends ModelEditorComponentBase<GraffitiInfoPart>
  implements OnInit
{
  public graffitiId: FormControl<string | null>;
  public language: FormControl<string | null>;
  public verse: FormControl<string | null>;
  public rhyme: FormControl<string | null>;
  public date: FormControl<HistoricalDateModel | null>;
  public author: FormControl<string | null>;
  public idents: FormArray;

  // languages
  public langEntries: ThesaurusEntry[] | undefined;
  public verseEntries: ThesaurusEntry[] | undefined;

  constructor(authService: AuthJwtService, private _formBuilder: FormBuilder) {
    super(authService, _formBuilder);
    this.graffitiId = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[-a-zA-Z0-9_]+$'),
    ]);
    this.language = _formBuilder.control(null, [
      Validators.required,
      Validators.pattern('^[a-z]{3}$'),
    ]);
    this.verse = _formBuilder.control(null, Validators.maxLength(50));
    this.rhyme = _formBuilder.control(null, Validators.maxLength(50));
    this.author = _formBuilder.control(null, Validators.maxLength(50));
    this.idents = _formBuilder.array([]);
    this.date = _formBuilder.control(null);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      graffitiId: this.graffitiId,
      language: this.language,
      verse: this.verse,
      rhyme: this.rhyme,
      author: this.author,
      idents: this.idents,
      date: this.date,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    let key = 'graffiti-languages';
    if (this.hasThesaurus(key)) {
      this.langEntries = thesauri[key].entries;
    } else {
      this.langEntries = undefined;
    }

    key = 'graffiti-verses';
    if (this.hasThesaurus(key)) {
      this.verseEntries = thesauri[key].entries;
    } else {
      this.verseEntries = undefined;
    }
  }

  private getIdentGroup(rid?: RankedId): FormGroup {
    return this._formBuilder.group({
      id: this._formBuilder.control(rid?.id, [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[-a-zA-Z0-9_]+$'),
      ]),
      rank: this._formBuilder.control(0),
    });
  }

  public addIdent(item?: RankedId): void {
    this.idents.push(this.getIdentGroup(item));
    this.idents.markAsDirty();
  }

  public removeIdent(index: number): void {
    this.idents.removeAt(index);
    this.idents.markAsDirty();
  }

  public moveIdentUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.idents.controls[index];
    this.idents.removeAt(index);
    this.idents.insert(index - 1, item);
    this.idents.markAsDirty();
  }

  public moveIdentDown(index: number): void {
    if (index + 1 >= this.idents.length) {
      return;
    }
    const item = this.idents.controls[index];
    this.idents.removeAt(index);
    this.idents.insert(index + 1, item);
    this.idents.markAsDirty();
  }

  private getIdents(): RankedId[] | undefined {
    const entries: RankedId[] = [];
    for (let i = 0; i < this.idents.length; i++) {
      const g = this.idents.at(i) as FormGroup;
      entries.push({
        id: g.controls.id.value?.trim(),
        rank: g.controls.rank.value || 0,
      });
    }
    return entries.length ? entries : undefined;
  }

  private updateForm(part?: GraffitiInfoPart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.graffitiId.setValue(part.graffitiId);
    this.language.setValue(part.language);
    this.verse.setValue(part.verse || null);
    this.rhyme.setValue(part.rhyme || null);
    this.author.setValue(part.author || null);
    this.idents.clear();
    if (part.identifications) {
      for (let i of part.identifications) {
        this.idents.controls.push(this.getIdentGroup(i));
      }
    }
    this.date.setValue(part.date || null);
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<GraffitiInfoPart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): GraffitiInfoPart {
    let part = this.getEditedPart(
      GRAFFITI_INFO_PART_TYPEID
    ) as GraffitiInfoPart;
    part.graffitiId = this.graffitiId.value?.trim() || '';
    part.language = this.language.value?.trim() || '';
    part.verse = this.verse.value?.trim();
    part.rhyme = this.rhyme.value?.trim();
    part.author = this.author.value?.trim();
    part.identifications = this.getIdents();
    part.date = this.date.value || undefined;

    return part;
  }

  public onDateChange(date: HistoricalDateModel): void {
    this.date.setValue(date);
  }
}
