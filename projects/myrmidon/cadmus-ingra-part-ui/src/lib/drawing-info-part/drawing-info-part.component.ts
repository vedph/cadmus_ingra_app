import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry, deepCopy } from '@myrmidon/cadmus-core';

import {
  DrawingInfoPart,
  DRAWING_INFO_PART_TYPEID,
} from '../drawing-info-part';

/**
 * DrawingInfo editor component.
 * Thesauri: TODO thesauri names and optionality
 */
@Component({
  selector: 'ingra-drawing-info-part',
  templateUrl: './drawing-info-part.component.html',
  styleUrls: ['./drawing-info-part.component.css'],
})
export class DrawingInfoPartComponent
  extends ModelEditorComponentBase<DrawingInfoPart>
  implements OnInit {
  // TODO form controls (form: FormGroup is inherited)

  // TODO thesauri entries, e.g.:
  // public tagEntries: ThesaurusEntry[];

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    // form
    // TODO build controls and set this.form
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: DrawingInfoPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    // TODO set controls values from model
    this.form.markAsPristine();
  }

  protected onModelSet(model: DrawingInfoPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    // TODO set entries from this.thesauri, e.g.:
    // const key = 'note-tags';
    // if (this.thesauri && this.thesauri[key]) {
    // this.tagEntries = this.thesauri[key].entries;
    // } else {
    //   this.tagEntries = null;
    // }
    // if not using any thesauri, just remove this function
  }

  protected getModelFromForm(): DrawingInfoPart {
    let part = this.model;
    if (!part) {
      part = {
        itemId: this.itemId,
        id: '',
        typeId: DRAWING_INFO_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: '',
        timeModified: new Date(),
        userId: '',
        description: '',
        subjects: []
      };
    }
    // TODO
    return part;
  }
}
