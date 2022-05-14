import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayIconShowcaseComponent } from './play-icon-showcase.component';
import { PlayIconModule } from '../play-icon.module';

@NgModule({
  imports: [CommonModule, PlayIconModule],
  declarations: [PlayIconShowcaseComponent, PlayIconShowcaseComponent],
  exports: [],
})
export class PlayIconShowcaseModule {}
