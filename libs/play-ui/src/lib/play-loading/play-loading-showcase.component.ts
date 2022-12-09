import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { PlayCardBodyComponent } from '../play-card/play-card-body/play-card-body.component';
import { PlayCardFooterComponent } from '../play-card/play-card-footer/play-card-footer.component';
import { PlayCardHeaderComponent } from '../play-card/play-card-header/play-card-header.component';
import { PlayCardComponent } from '../play-card/play-card/play-card.component';
import { PlayLoadingDirective } from './play-loading.directive';

@Component({
  selector: 'play-loading-showcase',
  template: `
    <play-card
      [playLoading]="true"
      style="height: 400px; width: 350px; margin-top: 10px; margin-left: 10px"
    >
      <play-card-header>Loading Demo</play-card-header>
      <play-card-body>
        When you click the button this area will present a context loader. Go
        ahead and try it.
      </play-card-body>
      <play-card-footer position="right">
        <button playButton appearance="play-flat" theme="primary">
          Click Here
        </button>
      </play-card-footer>
    </play-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PlayCardComponent,
    PlayCardHeaderComponent,
    PlayCardBodyComponent,
    PlayCardFooterComponent,
    PlayButtonComponent,
    PlayLoadingDirective,
  ],
})
export class PlayLoadingShowcaseComponent {}
