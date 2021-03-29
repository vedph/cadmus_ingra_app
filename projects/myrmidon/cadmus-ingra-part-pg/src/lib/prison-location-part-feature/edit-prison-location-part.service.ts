import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';
import { EditPrisonLocationPartStore } from './edit-prison-location-part.store';

@Injectable({ providedIn: 'root' })
export class EditPrisonLocationPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditPrisonLocationPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
