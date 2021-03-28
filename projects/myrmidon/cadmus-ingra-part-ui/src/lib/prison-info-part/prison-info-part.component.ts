import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy } from '@myrmidon/cadmus-core';

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
  implements OnInit {
  public prisonId: FormControl;
  public place: FormControl;

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
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

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: PrisonInfoPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.prisonId.setValue(model.prisonId);
    this.place.setValue(model.place);
    this.form.markAsPristine();
  }

  protected onModelSet(model: PrisonInfoPart): void {
    this.updateForm(deepCopy(model));
  }

  protected getModelFromForm(): PrisonInfoPart {
    let part = this.model;
    if (!part) {
      part = {
        itemId: this.itemId,
        id: '',
        typeId: PRISON_INFO_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: '',
        timeModified: new Date(),
        userId: '',
        prisonId: '',
        place: '',
      };
    }
    part.prisonId = this.prisonId.value?.trim();
    part.place = this.place.value?.trim();
    return part;
  }
}
