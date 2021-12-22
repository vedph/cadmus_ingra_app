import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';

import { EditPartState, EditPartStoreApi } from '@myrmidon/cadmus-state';

import { DRAWING_INFO_PART_TYPEID } from '@myrmidon/cadmus-ingra-part-ui';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: DRAWING_INFO_PART_TYPEID })
export class EditDrawingInfoPartStore
  extends Store<EditPartState>
  implements EditPartStoreApi
{
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
