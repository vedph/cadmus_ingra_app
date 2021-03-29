import { Injectable } from '@angular/core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';
import { EditPrisonerInfoPartStore } from './edit-prisoner-info-part.store';

@Injectable({ providedIn: 'root' })
export class EditPrisonerInfoPartQuery extends EditPartQueryBase {
  constructor(store: EditPrisonerInfoPartStore) {
    super(store);
  }
}
