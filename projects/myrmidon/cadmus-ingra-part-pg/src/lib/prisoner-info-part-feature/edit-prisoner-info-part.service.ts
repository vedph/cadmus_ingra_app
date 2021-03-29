import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';
import { EditPrisonerInfoPartStore } from './edit-prisoner-info-part.store';

@Injectable({ providedIn: 'root' })
export class EditPrisonerInfoPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditPrisonerInfoPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
