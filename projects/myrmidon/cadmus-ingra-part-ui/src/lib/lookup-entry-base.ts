import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

/**
 * A named entry used for lookup.
 */
export interface NamedEntry {
  name: string;
}

/**
 * Base class for lookup entry components.
 */
@Injectable()
export abstract class LookupEntryBase {
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
  public entryChange: EventEmitter<NamedEntry | null>;

  public form: FormGroup;
  public lookup: FormControl;
  public entries$: Observable<NamedEntry[]> | undefined;
  public entry: NamedEntry | undefined;

  constructor(formBuilder: FormBuilder) {
    this.label = '';
    // events
    this.entryChange = new EventEmitter<NamedEntry | null>();
    // form
    this.lookup = formBuilder.control(null);
    this.form = formBuilder.group({
      lookup: this.lookup,
    });
    this.limit = 10;
  }

  protected abstract lookupEntries(
    filter: any,
    limit: number
  ): Observable<NamedEntry[]>;

  ngOnInit(): void {
    this.entries$ = this.lookup.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: NamedEntry | string) => {
        // if it's a string it's a filter; else it's the entry got
        if (typeof value === 'string') {
          return this.lookupEntries(value, this.limit || 10);
        } else {
          return of([value]);
        }
      })
    );
  }

  public clear(): void {
    this.entry = undefined;
    this.lookup.setValue(null);
    this.entryChange.emit(null);
  }

  public getLookupName(entry: NamedEntry): string {
    return entry?.name;
  }

  public pickEntry(entry: NamedEntry): void {
    this.entry = entry;
    this.entryChange.emit(entry);
  }
}
