import { Injectable } from '@angular/core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';
import { EditGraffitiInfoPartStore } from './edit-graffiti-info-part.store';

@Injectable({ providedIn: 'root' })
export class EditGraffitiInfoPartQuery extends EditPartQueryBase {
  constructor(store: EditGraffitiInfoPartStore) {
    super(store);
  }
}
