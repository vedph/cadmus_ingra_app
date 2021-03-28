import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';
import { EditGraffitiInfoPartStore } from './edit-graffiti-info-part.store';

@Injectable({ providedIn: 'root' })
export class EditGraffitiInfoPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditGraffitiInfoPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
