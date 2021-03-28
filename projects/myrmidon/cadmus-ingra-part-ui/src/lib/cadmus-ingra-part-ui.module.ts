import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { PrisonInfoPartComponent } from './prison-info-part/prison-info-part.component';
import { GraffitiInfoPartComponent } from './graffiti-info-part/graffiti-info-part.component';

@NgModule({
  declarations: [GraffitiInfoPartComponent, PrisonInfoPartComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Cadmus
    CadmusMaterialModule,
    CadmusUiModule,
  ],
  exports: [GraffitiInfoPartComponent, PrisonInfoPartComponent],
})
export class CadmusIngraPartUiModule {}
