import { Injectable } from '@angular/core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';
import { EditPrisonLocationPartStore } from './edit-prison-location-part.store';

@Injectable({ providedIn: 'root' })
export class EditPrisonLocationPartQuery extends EditPartQueryBase {
  constructor(store: EditPrisonLocationPartStore) {
    super(store);
  }
}
