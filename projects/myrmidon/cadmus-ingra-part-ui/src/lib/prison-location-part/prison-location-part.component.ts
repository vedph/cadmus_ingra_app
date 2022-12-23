import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';

import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { DataPinInfo } from '@myrmidon/cadmus-core';

import {
  PrisonLocationPart,
  PRISON_LOCATION_PART_TYPEID,
} from '../prison-location-part';
import { AuthJwtService } from '@myrmidon/auth-jwt-login';

/**
 * PrisonLocation editor component.
 * Thesauri: none.
 */
@Component({
  selector: 'ingra-prison-location-part',
  templateUrl: './prison-location-part.component.html',
  styleUrls: ['./prison-location-part.component.css'],
})
export class PrisonLocationPartComponent
  extends ModelEditorComponentBase<PrisonLocationPart>
  implements OnInit
{
  public prisonId: FormControl<DataPinInfo | null>;
  public cell: FormControl<string | null>;
  public location: FormControl<string | null>;

  public orPrisonId: string | undefined;

  constructor(authService: AuthJwtService, formBuilder: FormBuilder) {
    super(authService, formBuilder);
    // form
    this.prisonId = formBuilder.control(null, Validators.required);
    this.cell = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.location = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern('^[A-Z]+[0-9]+$'),
    ]);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      prisonId: this.prisonId,
      cell: this.cell,
      location: this.location,
    });
  }

  private updateForm(part?: PrisonLocationPart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    // setting the original prison ID will cause
    // the lookup bound to prisonId to fetch the
    // corresponding data pin and thus set prisonId back
    this.orPrisonId = part.prisonId;
    // this.prisonId.setValue(model.prisonId);
    this.cell.setValue(part.cell);
    this.location.setValue(part.location);
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<PrisonLocationPart>): void {
    this.updateForm(data?.value);
  }

  protected getValue(): PrisonLocationPart {
    let part = this.getEditedPart(
      PRISON_LOCATION_PART_TYPEID
    ) as PrisonLocationPart;
    part.prisonId = this.prisonId.value?.value || '';
    part.cell = this.cell.value?.trim() || '';
    part.location = this.location.value?.trim() || '';
    return part;
  }

  public onPrisonEntryChange(entry: DataPinInfo | null): void {
    this.prisonId.setValue(entry);
    this.form.markAsDirty();
  }
}
