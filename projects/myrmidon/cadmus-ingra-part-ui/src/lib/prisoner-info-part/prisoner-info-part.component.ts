import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { ThesaurusEntry, DataPinInfo } from '@myrmidon/cadmus-core';

import {
  PrisonerInfoPart,
  PRISONER_INFO_PART_TYPEID,
} from '../prisoner-info-part';
import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { deepCopy } from '@myrmidon/ng-tools';
import { HistoricalDateModel } from '@myrmidon/cadmus-refs-historical-date';
import { AssertedProperName, ProperName } from '@myrmidon/cadmus-refs-proper-name';

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
    super(authService);
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
    this.form = formBuilder.group({
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

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: PrisonerInfoPart): void {
    if (!model) {
      this.form?.reset();
      return;
    }
    this.prisonerId.setValue(model.prisonerId);
    // setting the original prison ID will cause
    // the lookup bound to prisonId to fetch the
    // corresponding data pin and thus set prisonId back
    this.orPrisonId = model.prisonId;
    // this.prisonId.setValue(model.prisonId);
    this.sex.setValue(model.sex || null);
    this.name.setValue(model.name || null);
    this.origin.setValue(model.origin || null);
    this.birth.setValue(model.birthDate || null);
    this.death.setValue(model.deathDate || null);
    this.charge.setValue(model.charge || null);
    this.judgement.setValue(model.judgement || null);
    this.detStart.setValue(model.detentionStart || null);
    this.detEnd.setValue(model.detentionEnd || null);
    this.form?.markAsPristine();
  }

  public onPersonNameChange(name: AssertedProperName | undefined): void {
    this.name.setValue(name || null);
  }

  protected onModelSet(model: PrisonerInfoPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'person-name-languages';
    if (this.thesauri && this.thesauri[key]) {
      this.pnLangEntries = this.thesauri[key].entries;
    } else {
      this.pnLangEntries = undefined;
    }

    key = 'person-name-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.pnTagEntries = this.thesauri[key].entries;
    } else {
      this.pnTagEntries = undefined;
    }

    key = 'person-name-types';
    if (this.thesauri && this.thesauri[key]) {
      this.pnTypeEntries = this.thesauri[key].entries;
    } else {
      this.pnTypeEntries = undefined;
    }

    key = 'trial-charges';
    if (this.thesauri && this.thesauri[key]) {
      this.trChargeEntries = this.thesauri[key].entries;
    } else {
      this.trChargeEntries = undefined;
    }

    key = 'trial-judgements';
    if (this.thesauri && this.thesauri[key]) {
      this.trJudgementEntries = this.thesauri[key].entries;
    } else {
      this.trJudgementEntries = undefined;
    }
  }

  protected getModelFromForm(): PrisonerInfoPart {
    let part = this.model;
    if (!part) {
      part = {
        itemId: this.itemId || '',
        id: '',
        typeId: PRISONER_INFO_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: '',
        timeModified: new Date(),
        userId: '',
        prisonerId: '',
        prisonId: '',
      };
    }
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
