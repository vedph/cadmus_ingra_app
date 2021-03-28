import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';
import { EditPrisonInfoPartStore } from './edit-prison-info-part.store';

@Injectable({ providedIn: 'root' })
export class EditPrisonInfoPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditPrisonInfoPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
