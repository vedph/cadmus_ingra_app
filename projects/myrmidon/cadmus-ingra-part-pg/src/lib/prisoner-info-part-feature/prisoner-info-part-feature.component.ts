import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditPrisonerInfoPartService } from './edit-prisoner-info-part.service';
import { EditPrisonerInfoPartQuery } from './edit-prisoner-info-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ingra-prisoner-info-part-feature',
  templateUrl: './prisoner-info-part-feature.component.html',
  styleUrls: ['./prisoner-info-part-feature.component.css'],
})
export class PrisonerInfoPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditPrisonerInfoPartQuery,
    editPartService: EditPrisonerInfoPartService,
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
    this.initEditor([
      'person-name-languages',
      'person-name-tags',
      'person-name-types',
      'trial-charges',
      'trial-judgements',
    ]);
  }
}
