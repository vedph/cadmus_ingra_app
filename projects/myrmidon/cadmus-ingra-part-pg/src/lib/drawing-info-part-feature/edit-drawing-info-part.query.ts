import { Injectable } from '@angular/core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';
import { EditDrawingInfoPartStore } from './edit-drawing-info-part.store';

@Injectable({ providedIn: 'root' })
export class EditDrawingInfoPartQuery extends EditPartQueryBase {
  constructor(store: EditDrawingInfoPartStore) {
    super(store);
  }
}
