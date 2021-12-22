import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditDrawingInfoPartService } from './edit-drawing-info-part.service';
import { EditDrawingInfoPartQuery } from './edit-drawing-info-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ingra-drawing-info-part-feature',
  templateUrl: './drawing-info-part-feature.component.html',
  styleUrls: ['./drawing-info-part-feature.component.css'],
})
export class DrawingInfoPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditDrawingInfoPartQuery,
    editPartService: EditDrawingInfoPartService,
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
    this.initEditor(['drawing-subjects', 'drawing-colors', 'link-reasons']);
  }
}
