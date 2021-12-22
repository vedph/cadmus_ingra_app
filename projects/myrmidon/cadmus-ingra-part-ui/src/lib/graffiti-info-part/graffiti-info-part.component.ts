import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
} from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';

import {
  GraffitiInfoPart,
  GRAFFITI_INFO_PART_TYPEID,
  RankedId,
} from '../graffiti-info-part';
import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { deepCopy } from '@myrmidon/ng-tools';
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
  public graffitiId: FormControl;
  public language: FormControl;
  public verse: FormControl;
  public rhyme: FormControl;
  public date: FormControl;
  public author: FormControl;
  public idents: FormArray;

  // languages
  public langEntries: ThesaurusEntry[] | undefined;
  public verseEntries: ThesaurusEntry[] | undefined;

  constructor(authService: AuthJwtService, private _formBuilder: FormBuilder) {
    super(authService);
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
    // form
    this.form = _formBuilder.group({
      graffitiId: this.graffitiId,
      language: this.language,
      verse: this.verse,
      rhyme: this.rhyme,
      author: this.author,
      idents: this.idents,
      date: this.date,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
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

  private updateForm(model: GraffitiInfoPart): void {
    if (!model) {
      this.form?.reset();
      return;
    }
    this.graffitiId.setValue(model.graffitiId);
    this.language.setValue(model.language);
    this.verse.setValue(model.verse);
    this.rhyme.setValue(model.rhyme);
    this.author.setValue(model.author);
    this.idents.clear();
    if (model.identifications) {
      for (let i of model.identifications) {
        this.idents.controls.push(this.getIdentGroup(i));
      }
    }
    this.date.setValue(model.date);
    this.form?.markAsPristine();
  }

  protected onModelSet(model: GraffitiInfoPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'graffiti-languages';
    if (this.thesauri && this.thesauri[key]) {
      this.langEntries = this.thesauri[key].entries;
    } else {
      this.langEntries = undefined;
    }

    key = 'graffiti-verses';
    if (this.thesauri && this.thesauri[key]) {
      this.verseEntries = this.thesauri[key].entries;
    } else {
      this.verseEntries = undefined;
    }
  }

  protected getModelFromForm(): GraffitiInfoPart {
    let part = this.model;
    if (!part) {
      part = {
        itemId: this.itemId || '',
        id: '',
        typeId: GRAFFITI_INFO_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: '',
        timeModified: new Date(),
        userId: '',
        graffitiId: '',
        language: '',
      };
    }
    part.graffitiId = this.graffitiId.value?.trim();
    part.language = this.language.value?.trim();
    part.verse = this.verse.value?.trim();
    part.rhyme = this.rhyme.value?.trim();
    part.author = this.author.value?.trim();
    part.identifications = this.getIdents();
    part.date = this.date.value;

    return part;
  }

  public onDateChange(date: HistoricalDateModel): void {
    this.date.setValue(date);
  }
}
