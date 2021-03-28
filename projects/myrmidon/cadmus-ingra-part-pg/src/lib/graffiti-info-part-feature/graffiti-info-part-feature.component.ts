import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';
import { EditGraffitiInfoPartService } from './edit-graffiti-info-part.service';
import { EditGraffitiInfoPartQuery } from './edit-graffiti-info-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ingra-graffiti-info-part-feature',
  templateUrl: './graffiti-info-part-feature.component.html',
  styleUrls: ['./graffiti-info-part-feature.component.css'],
})
export class GraffitiInfoPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditGraffitiInfoPartQuery,
    editPartService: EditGraffitiInfoPartService,
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
    this.initEditor(['graffiti-languages', 'graffiti-verses']);
  }
}
