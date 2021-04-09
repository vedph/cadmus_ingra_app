import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { DataPinInfo, deepCopy } from '@myrmidon/cadmus-core';

import {
  PrisonLocationPart,
  PRISON_LOCATION_PART_TYPEID,
} from '../prison-location-part';

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
  implements OnInit {
  public prisonId: FormControl;
  public cell: FormControl;
  public location: FormControl;

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
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
    this.form = formBuilder.group({
      prisonId: this.prisonId,
      cell: this.cell,
      location: this.location,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: PrisonLocationPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.prisonId.setValue(model.prisonId);
    this.cell.setValue(model.cell);
    this.location.setValue(model.location);
    this.form.markAsPristine();
  }

  protected onModelSet(model: PrisonLocationPart): void {
    this.updateForm(deepCopy(model));
  }

  protected getModelFromForm(): PrisonLocationPart {
    let part = this.model;
    if (!part) {
      part = {
        itemId: this.itemId,
        id: '',
        typeId: PRISON_LOCATION_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: '',
        timeModified: new Date(),
        userId: '',
        prisonId: '',
        cell: '',
        location: '',
      };
    }
    part.prisonId = this.prisonId.value?.value;
    part.cell = this.cell.value?.trim();
    part.location = this.location.value?.trim();
    return part;
  }

  public onPrisonEntryChange(entry: DataPinInfo | null): void {
    this.prisonId.setValue(entry);
    this.form.markAsDirty();
  }
}
