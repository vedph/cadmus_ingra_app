import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditPrisonInfoPartService } from './edit-prison-info-part.service';
import { EditPrisonInfoPartQuery } from './edit-prison-info-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ingra-prison-info-part-feature',
  templateUrl: './prison-info-part-feature.component.html',
  styleUrls: ['./prison-info-part-feature.component.css'],
})
export class PrisonInfoPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditPrisonInfoPartQuery,
    editPartService: EditPrisonInfoPartService,
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
