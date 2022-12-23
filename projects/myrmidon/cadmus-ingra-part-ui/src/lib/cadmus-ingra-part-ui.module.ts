import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
// import { CadmusItineraUiModule } from '@myrmidon/cadmus-itinera-ui';
// import { CadmusItineraCoreModule } from '@myrmidon/cadmus-itinera-core';

import { MonacoEditorModule } from 'ngx-monaco-editor';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NgToolsModule } from '@myrmidon/ng-tools';
import { CadmusCoreModule } from '@myrmidon/cadmus-core';
import { CadmusRefsProperNameModule } from '@myrmidon/cadmus-refs-proper-name';
import { CadmusRefsDecoratedIdsModule } from '@myrmidon/cadmus-refs-decorated-ids';
import { CadmusRefsHistoricalDateModule } from '@myrmidon/cadmus-refs-historical-date';
import { CadmusRefsDocReferencesModule } from '@myrmidon/cadmus-refs-doc-references';
import { CadmusUiFlagsPickerModule } from '@myrmidon/cadmus-ui-flags-picker';

import { PrisonInfoPartComponent } from './prison-info-part/prison-info-part.component';
import { GraffitiInfoPartComponent } from './graffiti-info-part/graffiti-info-part.component';
import { PrisonLocationPartComponent } from './prison-location-part/prison-location-part.component';
import { PrisonerInfoPartComponent } from './prisoner-info-part/prisoner-info-part.component';
import { DrawingInfoPartComponent } from './drawing-info-part/drawing-info-part.component';

@NgModule({
  declarations: [
    DrawingInfoPartComponent,
    GraffitiInfoPartComponent,
    PrisonInfoPartComponent,
    PrisonerInfoPartComponent,
    PrisonLocationPartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule,
    // material
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    // cadmus
    NgToolsModule,
    CadmusCoreModule,
    CadmusUiModule,
    CadmusUiFlagsPickerModule,
    CadmusRefsHistoricalDateModule,
    CadmusRefsDocReferencesModule,
    CadmusRefsProperNameModule,
    CadmusRefsDecoratedIdsModule,
  ],
  exports: [
    DrawingInfoPartComponent,
    GraffitiInfoPartComponent,
    PrisonInfoPartComponent,
    PrisonerInfoPartComponent,
    PrisonLocationPartComponent,
  ],
})
export class CadmusIngraPartUiModule {}
