import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemService } from '@myrmidon/cadmus-api';
import {
  DataPage,
  DataPinInfo,
  ErrorWrapper,
  IndexLookupDefinitions,
} from '@myrmidon/cadmus-core';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
  take,
} from 'rxjs/operators';
import { map } from 'rxjs/operators';

/**
 * Generic data pin lookup component. This allows users typing a part
 * of a pin's value and get the full pin.
 */
@Component({
  selector: 'ingra-lookup-pin',
  templateUrl: './lookup-pin.component.html',
  styleUrls: ['./lookup-pin.component.css'],
})
export class LookupPinComponent implements OnInit {
  private _initialName: string | undefined;

  /**
   * The entry name initially set when the component loads.
   */
  @Input()
  public get initialName(): string | undefined {
    return this._initialName;
  }
  public set initialName(value: string | undefined) {
    this._initialName = value;
    if (this.lookup) {
      this.lookup.setValue(value);
    }
  }

  /**
   * The label to be displayed for this lookup.
   */
  @Input()
  public label: string;

  /**
   * The maximum count of lookup entries to retrieve.
   * Default is 10.
   */
  @Input()
  public limit: number;

  /**
   * Fired whenever an entry is picked. Usually you should
   * cast the received argument to a more specific type.
   */
  @Output()
  public entryChange: EventEmitter<DataPinInfo | null>;

  public form: FormGroup;
  public lookup: FormControl;
  public entries$: Observable<DataPinInfo[]> | undefined;
  public entry: DataPinInfo | undefined;

  constructor(
    formBuilder: FormBuilder,
    private _itemService: ItemService,
    @Inject('indexLookupDefinitions')
    private _lookupDefs: IndexLookupDefinitions
  ) {
    this.label = '';
    // events
    this.entryChange = new EventEmitter<DataPinInfo | null>();
    // form
    this.lookup = formBuilder.control(null);
    this.form = formBuilder.group({
      lookup: this.lookup,
    });
    this.limit = 10;
  }

  /**
   * The lookup key to be used for this component.
   * This should be a key from the injectable indexLookupDefinitions.
   */
  @Input()
  public lookupKey: string | undefined;

  ngOnInit(): void {
    this.entries$ = this.lookup.valueChanges.pipe(
      // startWith(this._initialName),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: DataPinInfo | string) => {
        // if it's a string it's a filter; else it's the entry got
        if (typeof value === 'string') {
          return this.lookupEntries(value, this.limit || 10);
        } else {
          return of([value]);
        }
      })
    );
    // setup initial value if its name was specified
    if (this._initialName) {
      this.lookupEntries(this._initialName, 1)
        .pipe(take(1))
        .subscribe((i) => {
          this.lookup.setValue(i);
        });
    }
  }

  private lookupEntries(filter: any, limit: number): Observable<DataPinInfo[]> {
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
          return w.value?.items || [];
        }
      })
    );
  }

  public clear(): void {
    this.entry = undefined;
    this.lookup.setValue(null);
    this.entryChange.emit(null);
  }

  public entryToName(entry: DataPinInfo): string {
    return entry?.value;
  }

  public pickEntry(entry: DataPinInfo): void {
    this.entry = entry;
    this.entryChange.emit(entry);
  }
}
