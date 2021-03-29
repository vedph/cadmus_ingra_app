import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import { PRISON_LOCATION_PART_TYPEID } from '@myrmidon/cadmus-ingra-part-ui';

import {
  EditPartState,
  EditPartStoreApi,
  editPartInitialState,
} from '@myrmidon/cadmus-state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: PRISON_LOCATION_PART_TYPEID })
export class EditPrisonLocationPartStore
  extends Store<EditPartState>
  implements EditPartStoreApi {
  constructor() {
    super(editPartInitialState);
  }

  public setDirty(value: boolean): void {
    this.update({ dirty: value });
  }
  public setSaving(value: boolean): void {
    this.update({ saving: value });
  }
}
