import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PlaySidenavContainerComponent } from './play-sidenav-container/play-sidenav-container.component';
import { PlaySidenavContentComponent } from './play-sidenav-content/play-sidenav-content.component';

import { PlaySidenavComponent } from './play-sidenav/play-sidenav.component';

@NgModule({
  imports: [MatSidenavModule],
  exports: [
    PlaySidenavContainerComponent,
    PlaySidenavComponent,
    PlaySidenavContentComponent,
  ],
  declarations: [
    PlaySidenavContainerComponent,
    PlaySidenavComponent,
    PlaySidenavContentComponent,
  ],
  providers: [],
})
export class PlaySidenavModule {}
