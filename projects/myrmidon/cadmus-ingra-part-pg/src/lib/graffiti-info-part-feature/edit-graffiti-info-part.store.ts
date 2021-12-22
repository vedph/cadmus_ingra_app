import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import { GRAFFITI_INFO_PART_TYPEID } from '@myrmidon/cadmus-ingra-part-ui';

import {
  EditPartState,
  EditPartStoreApi,
} from '@myrmidon/cadmus-state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: GRAFFITI_INFO_PART_TYPEID })
export class EditGraffitiInfoPartStore
  extends Store<EditPartState>
  implements EditPartStoreApi {
  constructor() {
    super({});
  }

  public setDirty(value: boolean): void {
    this.update({ dirty: value });
  }
  public setSaving(value: boolean): void {
    this.update({ saving: value });
  }
}
