import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ItemService } from '@myrmidon/cadmus-api';
import {
  DataPage,
  DataPinInfo,
  ErrorWrapper,
  IndexLookupDefinitions,
} from '@myrmidon/cadmus-core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NamedEntry, LookupEntryBase } from '../lookup-entry-base';

/**
 * Generic data pin lookup component. This allows users typing a part
 * of a pin's value and get the full pin.
 */
@Component({
  selector: 'ingra-lookup-pin',
  templateUrl: '../lookup-entry-base.html',
  styleUrls: ['./lookup-pin.component.css'],
})
export class LookupPinComponent extends LookupEntryBase implements OnInit {
  constructor(
    formBuilder: FormBuilder,
    private _itemService: ItemService,
    @Inject('indexLookupDefinitions')
    private _lookupDefs: IndexLookupDefinitions
  ) {
    super(formBuilder);
  }

  /**
   * The lookup key to be used for this component.
   * This should be a key from the injectable indexLookupDefinitions.
   */
  @Input()
  public lookupKey: string | undefined;

  protected lookupEntries(
    filter: any,
    limit: number
  ): Observable<NamedEntry[]> {
    // get the lookup definition
    if (!this.lookupKey) {
      return of([]);
    }
    const ld = this._lookupDefs[this.lookupKey];
    if (!ld) {
      return of([]);
    }

    // build query
    const query = ld.roleId
      ? `[partTypeId=${ld.typeId}] AND [roleId=${ld.roleId}] AND [name=${ld.name}] AND [value^=${filter}]`
      : `[partTypeId=${ld.typeId}] AND [name=${ld.name}] AND [value^=${filter}]`;

    // search
    return this._itemService.searchPins(query, 1, limit).pipe(
      map((w: ErrorWrapper<DataPage<DataPinInfo>>) => {
        if (w.error) {
          return [];
        } else {
          return (w.value?.items || []).map((i) => {
            return { ...i, pinName: i.name, name: i.value };
          });
        }
      })
    );
  }
}
