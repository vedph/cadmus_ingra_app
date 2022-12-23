import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';

import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import {
  ThesaurusEntry,
  DataPinInfo,
  ThesauriSet,
} from '@myrmidon/cadmus-core';
import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { HistoricalDateModel } from '@myrmidon/cadmus-refs-historical-date';
import {
  AssertedProperName,
  ProperName,
} from '@myrmidon/cadmus-refs-proper-name';

import {
  PrisonerInfoPart,
  PRISONER_INFO_PART_TYPEID,
} from '../prisoner-info-part';

/**
 * PrisonerInfo editor component.
 * Thesauri: person-name-languages, person-name-tags, person-name-types,
 * trial-charges, trial-judgements (all optional).
 */
@Component({
  selector: 'ingra-prisoner-info-part',
  templateUrl: './prisoner-info-part.component.html',
  styleUrls: ['./prisoner-info-part.component.css'],
})
export class PrisonerInfoPartComponent
  extends ModelEditorComponentBase<PrisonerInfoPart>
  implements OnInit
{
  public prisonerId: FormControl<string | null>;
  public prisonId: FormControl<DataPinInfo | null>;
  public sex: FormControl<string | null>;
  public name: FormControl<AssertedProperName | null>;
  public origin: FormControl<string | null>;
  public birth: FormControl<HistoricalDateModel | null>;
  public death: FormControl<HistoricalDateModel | null>;

  public charge: FormControl<string | null>;
  public judgement: FormControl<string | null>;
  public detStart: FormControl<HistoricalDateModel | null>;
  public detEnd: FormControl<HistoricalDateModel | null>;

  public orPrisonId: string | undefined;
  public personName: ProperName;

  // person-name-languages
  public pnLangEntries: ThesaurusEntry[] | undefined;
  // person-name-tags
  public pnTagEntries: ThesaurusEntry[] | undefined;
  // person-name-types
  public pnTypeEntries: ThesaurusEntry[] | undefined;
  // trial-charges
  public trChargeEntries: ThesaurusEntry[] | undefined;
  // trial-judgements
  public trJudgementEntries: ThesaurusEntry[] | undefined;

  constructor(authService: AuthJwtService, formBuilder: FormBuilder) {
    super(authService, formBuilder);
    this.personName = {
      language: 'ita',
      pieces: [],
    };
    // form
    this.prisonerId = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[-a-zA-Z_0-9]+$'),
    ]);
    this.prisonId = formBuilder.control(null, Validators.required);
    this.sex = formBuilder.control(null);
    this.name = formBuilder.control(null, Validators.required);
    this.origin = formBuilder.control(null, Validators.maxLength(50));
    this.birth = formBuilder.control(null);
    this.death = formBuilder.control(null);
    this.charge = formBuilder.control(null, Validators.maxLength(50));
    this.judgement = formBuilder.control(null, Validators.maxLength(50));
    this.detStart = formBuilder.control(null);
    this.detEnd = formBuilder.control(null);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      prisonerId: this.prisonerId,
      prisonId: this.prisonId,
      sex: this.sex,
      name: this.name,
      origin: this.origin,
      birth: this.birth,
      death: this.death,
      charge: this.charge,
      judgement: this.judgement,
      detStart: this.detStart,
      detEnd: this.detEnd,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    let key = 'person-name-languages';
    if (this.hasThesaurus(key)) {
      this.pnLangEntries = thesauri[key].entries;
    } else {
      this.pnLangEntries = undefined;
    }

    key = 'person-name-tags';
    if (this.hasThesaurus(key)) {
      this.pnTagEntries = thesauri[key].entries;
    } else {
      this.pnTagEntries = undefined;
    }

    key = 'person-name-types';
    if (this.hasThesaurus(key)) {
      this.pnTypeEntries = thesauri[key].entries;
    } else {
      this.pnTypeEntries = undefined;
    }

    key = 'trial-charges';
    if (this.hasThesaurus(key)) {
      this.trChargeEntries = thesauri[key].entries;
    } else {
      this.trChargeEntries = undefined;
    }

    key = 'trial-judgements';
    if (this.hasThesaurus(key)) {
      this.trJudgementEntries = thesauri[key].entries;
    } else {
      this.trJudgementEntries = undefined;
    }
  }

  private updateForm(part?: PrisonerInfoPart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.prisonerId.setValue(part.prisonerId);
    // setting the original prison ID will cause
    // the lookup bound to prisonId to fetch the
    // corresponding data pin and thus set prisonId back
    this.orPrisonId = part.prisonId;
    // this.prisonId.setValue(model.prisonId);
    this.sex.setValue(part.sex || null);
    this.name.setValue(part.name || null);
    this.origin.setValue(part.origin || null);
    this.birth.setValue(part.birthDate || null);
    this.death.setValue(part.deathDate || null);
    this.charge.setValue(part.charge || null);
    this.judgement.setValue(part.judgement || null);
    this.detStart.setValue(part.detentionStart || null);
    this.detEnd.setValue(part.detentionEnd || null);
    this.form.markAsPristine();
  }

  public onPersonNameChange(name: AssertedProperName | undefined): void {
    this.name.setValue(name || null);
  }

  protected override onDataSet(data?: EditedObject<PrisonerInfoPart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): PrisonerInfoPart {
    let part = this.getEditedPart(
      PRISONER_INFO_PART_TYPEID
    ) as PrisonerInfoPart;
    part.prisonerId = this.prisonerId.value?.trim() || '';
    part.prisonId = this.prisonId.value?.value || '';
    part.sex = this.sex.value || '';
    part.name = this.name.value!;
    part.origin = this.origin.value?.trim();
    part.birthDate = this.birth.value || undefined;
    part.deathDate = this.death.value || undefined;
    part.charge = this.charge.value?.trim();
    part.judgement = this.judgement.value?.trim();
    part.detentionStart = this.detStart.value || undefined;
    part.detentionEnd = this.detEnd.value || undefined;
    return part;
  }

  public onPrisonEntryChange(entry: DataPinInfo | null): void {
    this.prisonId.setValue(entry);
    this.form?.markAsDirty();
  }

  public onBirthDateChange(date: HistoricalDateModel): void {
    this.birth.setValue(date);
  }

  public onDeathDateChange(date: HistoricalDateModel): void {
    this.death.setValue(date);
  }

  public onDetStartDateChange(date: HistoricalDateModel): void {
    this.detStart.setValue(date);
  }

  public onDetEndDateChange(date: HistoricalDateModel): void {
    this.detEnd.setValue(date);
  }
}
