import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CadmusIngraPartUiModule,
  DRAWING_INFO_PART_TYPEID,
  GRAFFITI_INFO_PART_TYPEID,
  PRISONER_INFO_PART_TYPEID,
  PRISON_INFO_PART_TYPEID,
  PRISON_LOCATION_PART_TYPEID,
} from '@myrmidon/cadmus-ingra-part-ui';
import { RouterModule } from '@angular/router';
import { CadmusCoreModule, PendingChangesGuard } from '@myrmidon/cadmus-core';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { CadmusStateModule } from '@myrmidon/cadmus-state';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';
import { PrisonInfoPartFeatureComponent } from './prison-info-part-feature/prison-info-part-feature.component';
import { GraffitiInfoPartFeatureComponent } from './graffiti-info-part-feature/graffiti-info-part-feature.component';
import { PrisonLocationPartFeatureComponent } from './prison-location-part-feature/prison-location-part-feature.component';
import { PrisonerInfoPartFeatureComponent } from './prisoner-info-part-feature/prisoner-info-part-feature.component';
import { DrawingInfoPartFeatureComponent } from './drawing-info-part-feature/drawing-info-part-feature.component';

export const RouterModuleForChild = RouterModule.forChild([
  {
    path: `${DRAWING_INFO_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: DrawingInfoPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${GRAFFITI_INFO_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: GraffitiInfoPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${PRISON_INFO_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: PrisonInfoPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${PRISONER_INFO_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: PrisonerInfoPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${PRISON_LOCATION_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: PrisonLocationPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
]);

@NgModule({
  declarations: [
    DrawingInfoPartFeatureComponent,
    GraffitiInfoPartFeatureComponent,
    PrisonInfoPartFeatureComponent,
    PrisonerInfoPartFeatureComponent,
    PrisonLocationPartFeatureComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Cadmus
    RouterModuleForChild,
    CadmusCoreModule,
    CadmusMaterialModule,
    CadmusStateModule,
    CadmusUiModule,
    CadmusUiPgModule,
    CadmusIngraPartUiModule,
  ],
  exports: [
    DrawingInfoPartFeatureComponent,
    GraffitiInfoPartFeatureComponent,
    PrisonInfoPartFeatureComponent,
    PrisonerInfoPartFeatureComponent,
    PrisonLocationPartFeatureComponent,
  ],
})
export class CadmusIngraPartPgModule {}
