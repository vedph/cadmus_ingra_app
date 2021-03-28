import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CadmusIngraPartUiModule,
  PRISON_INFO_PART_TYPEID,
} from '@myrmidon/cadmus-ingra-part-ui';
import { PrisonInfoPartFeatureComponent } from './prison-info-part-feature/prison-info-part-feature.component';
import { RouterModule } from '@angular/router';
import { CadmusCoreModule, PendingChangesGuard } from '@myrmidon/cadmus-core';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { CadmusStateModule } from '@myrmidon/cadmus-state';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';

export const RouterModuleForChild = RouterModule.forChild([
  {
    path: `${PRISON_INFO_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: PrisonInfoPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
]);

@NgModule({
  declarations: [PrisonInfoPartFeatureComponent],
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
  exports: [PrisonInfoPartFeatureComponent],
})
export class CadmusIngraPartPgModule {}
