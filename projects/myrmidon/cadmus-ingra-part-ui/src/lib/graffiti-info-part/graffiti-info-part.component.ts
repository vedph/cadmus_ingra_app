import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';

import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { HistoricalDateModel } from '@myrmidon/cadmus-refs-historical-date';

import {
  GraffitiInfoPart,
  GRAFFITI_INFO_PART_TYPEID,
} from '../graffiti-info-part';
import { AssertedCompositeId } from '@myrmidon/cadmus-refs-asserted-ids';

/**
 * GraffitiInfo editor component.
 * Thesauri: graffiti-languages, graffiti-verses, asserted-id-tags,
 * asserted-id-scopes, chronotope-tags, assertion-tags, doc-reference-types,
 * doc-reference-tags.
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
  public idents: FormControl<AssertedCompositeId[]>;

  // graffiti-languages
  public langEntries: ThesaurusEntry[] | undefined;
  // graffiti-verses
  public verseEntries: ThesaurusEntry[] | undefined;
  // asserted-id-tags
  public idTagEntries: ThesaurusEntry[] | undefined;
  // asserted-id-scopes
  public idScopeEntries: ThesaurusEntry[] | undefined;
  // chronotope-tags
  public ctTagEntries: ThesaurusEntry[] | undefined;
  // assertion-tags
  public assTagEntries: ThesaurusEntry[] | undefined;
  // doc-reference-types
  public refTypeEntries: ThesaurusEntry[] | undefined;
  // doc-reference-tags
  public refTagEntries: ThesaurusEntry[] | undefined;

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
    this.idents = _formBuilder.control([], { nonNullable: true });
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

    key = 'asserted-id-tags';
    if (this.hasThesaurus(key)) {
      this.idTagEntries = thesauri[key].entries;
    } else {
      this.idTagEntries = undefined;
    }

    key = 'asserted-id-scopes';
    if (this.hasThesaurus(key)) {
      this.idScopeEntries = thesauri[key].entries;
    } else {
      this.idScopeEntries = undefined;
    }

    key = 'chronotope-tags';
    if (this.hasThesaurus(key)) {
      this.ctTagEntries = thesauri[key].entries;
    } else {
      this.ctTagEntries = undefined;
    }

    key = 'assertion-tags';
    if (this.hasThesaurus(key)) {
      this.assTagEntries = thesauri[key].entries;
    } else {
      this.assTagEntries = undefined;
    }

    key = 'doc-reference-types';
    if (this.hasThesaurus(key)) {
      this.refTypeEntries = thesauri[key].entries;
    } else {
      this.refTypeEntries = undefined;
    }

    key = 'doc-reference-tags';
    if (this.hasThesaurus(key)) {
      this.refTagEntries = thesauri[key].entries;
    } else {
      this.refTagEntries = undefined;
    }
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
    this.idents.setValue(part.identifications || []);
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
    part.identifications = this.idents.value?.length
      ? this.idents.value
      : undefined;
    part.date = this.date.value || undefined;

    return part;
  }

  public onDateChange(date: HistoricalDateModel): void {
    this.date.setValue(date);
  }

  public onIdentsChange(ids: AssertedCompositeId[]): void {
    this.idents.setValue(ids);
    this.idents.markAsDirty();
    this.idents.updateValueAndValidity();
  }
}
