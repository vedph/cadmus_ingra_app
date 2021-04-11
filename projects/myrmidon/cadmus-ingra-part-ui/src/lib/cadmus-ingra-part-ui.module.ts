import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { PrisonInfoPartComponent } from './prison-info-part/prison-info-part.component';
import { GraffitiInfoPartComponent } from './graffiti-info-part/graffiti-info-part.component';
import { PrisonLocationPartComponent } from './prison-location-part/prison-location-part.component';
import { CadmusItineraUiModule } from '@myrmidon/cadmus-itinera-ui';
import { CadmusItineraCoreModule } from '@myrmidon/cadmus-itinera-core';
import { PrisonerInfoPartComponent } from './prisoner-info-part/prisoner-info-part.component';
import { DrawingInfoPartComponent } from './drawing-info-part/drawing-info-part.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';

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
    // Cadmus
    CadmusMaterialModule,
    CadmusUiModule,
    CadmusItineraCoreModule,
    CadmusItineraUiModule
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
