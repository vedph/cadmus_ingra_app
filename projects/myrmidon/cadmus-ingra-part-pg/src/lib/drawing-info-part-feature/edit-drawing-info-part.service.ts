import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';
import { EditDrawingInfoPartStore } from './edit-drawing-info-part.store';

@Injectable({ providedIn: 'root' })
export class EditDrawingInfoPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditDrawingInfoPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
