import { NgModule } from '@angular/core';
import { PlayCheckboxModule } from '../play-checkbox.module';

import { PlayCheckboxShowcaseComponent } from './play-checkbox-showcase.component';

@NgModule({
  imports: [PlayCheckboxModule],
  exports: [PlayCheckboxShowcaseComponent],
  declarations: [PlayCheckboxShowcaseComponent],
  providers: [],
})
export class PlayCheckboxShowcaseModule {}
