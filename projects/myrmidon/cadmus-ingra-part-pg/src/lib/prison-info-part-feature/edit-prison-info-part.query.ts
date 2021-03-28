import { Injectable } from '@angular/core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';
import { EditPrisonInfoPartStore } from './edit-prison-info-part.store';

@Injectable({ providedIn: 'root' })
export class EditPrisonInfoPartQuery extends EditPartQueryBase {
  constructor(store: EditPrisonInfoPartStore) {
    super(store);
  }
}
