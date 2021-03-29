import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditPrisonLocationPartService } from './edit-prison-location-part.service';
import { EditPrisonLocationPartQuery } from './edit-prison-location-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ingra-prison-location-part-feature',
  templateUrl: './prison-location-part-feature.component.html',
  styleUrls: ['./prison-location-part-feature.component.css'],
})
export class PrisonLocationPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditPrisonLocationPartQuery,
    editPartService: EditPrisonLocationPartService,
    editItemQuery: EditItemQuery,
    editItemService: EditItemService
  ) {
    super(
      router,
      route,
      snackbar,
      editPartQuery,
      editPartService,
      editItemQuery,
      editItemService
    );
  }

  public ngOnInit(): void {
    this.initEditor(null);
  }
}
