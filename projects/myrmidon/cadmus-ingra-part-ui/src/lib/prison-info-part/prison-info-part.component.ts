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

import { PrisonInfoPart, PRISON_INFO_PART_TYPEID } from '../prison-info-part';

/**
 * PrisonInfo editor component.
 * Thesauri: none.
 */
@Component({
  selector: 'ingra-prison-info-part',
  templateUrl: './prison-info-part.component.html',
  styleUrls: ['./prison-info-part.component.css'],
})
export class PrisonInfoPartComponent
  extends ModelEditorComponentBase<PrisonInfoPart>
  implements OnInit
{
  public prisonId: FormControl<string | null>;
  public place: FormControl<string | null>;

  constructor(authService: AuthJwtService, formBuilder: FormBuilder) {
    super(authService, formBuilder);
    // form
    this.prisonId = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[-a-zA-Z_0-9]+$'),
    ]);
    this.place = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(200),
    ]);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      prisonId: this.prisonId,
      place: this.place,
    });
  }

  private updateForm(part?: PrisonInfoPart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.prisonId.setValue(part.prisonId);
    this.place.setValue(part.place);
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<PrisonInfoPart>): void {
    this.updateForm(data?.value);
  }

  protected getValue(): PrisonInfoPart {
    let part = this.getEditedPart(PRISON_INFO_PART_TYPEID) as PrisonInfoPart;
    part.prisonId = this.prisonId.value?.trim() || '';
    part.place = this.place.value?.trim() || '';
    return part;
  }
}
