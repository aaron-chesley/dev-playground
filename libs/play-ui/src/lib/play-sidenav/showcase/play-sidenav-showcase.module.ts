import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaySidenavModule } from '../play-sidenav.module';

import { PlaySidenavShowcaseComponent } from './play-sidenav-showcase.component';

@NgModule({
  imports: [BrowserAnimationsModule, PlaySidenavModule],
  exports: [PlaySidenavShowcaseComponent],
  declarations: [PlaySidenavShowcaseComponent],
  providers: [],
})
export class PlaySidenavShowcaseModule {}
