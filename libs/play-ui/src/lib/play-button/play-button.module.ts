import { NgModule } from '@angular/core';
import { PlayButtonGroupModule } from './play-button-group/play-button-group.module';
import { PlayButtonComponent } from './play-button.component';

@NgModule({
  imports: [PlayButtonGroupModule],
  declarations: [PlayButtonComponent],
  exports: [PlayButtonComponent, PlayButtonGroupModule],
  providers: [],
})
export class PlayButtonModule {}
