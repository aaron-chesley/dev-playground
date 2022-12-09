import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayButtonGroupComponent } from '../../play-button/play-button-group/play-button-group.component';
import { PlayButtonComponent } from '../../play-button/play-button.component';
import { PlayCheckboxComponent } from '../../play-checkbox/play-checkbox.component';
import { PlayIconRegistryService } from '../../play-icon/play-icon-registry.service';
import { PlayIconComponent } from '../../play-icon/play-icon.component';
import { close } from '../../play-icon/play-icons';
import { PlayCardBodyComponent } from '../play-card-body/play-card-body.component';
import { PlayCardFooterComponent } from '../play-card-footer/play-card-footer.component';
import { PlayCardHeaderComponent } from '../play-card-header/play-card-header.component';
import { PlayCardComponent } from '../play-card/play-card.component';

@Component({
  selector: 'play-card-showcase',
  templateUrl: './play-card-showcase.component.html',
  styleUrls: ['./play-card-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    PlayCardComponent,
    PlayCardHeaderComponent,
    PlayCardBodyComponent,
    PlayCardFooterComponent,
    PlayButtonComponent,
    PlayButtonGroupComponent,
    PlayIconComponent,
    PlayCheckboxComponent,
  ],
})
export class PlayCardShowcaseComponent {
  @Input() showHeader = true;
  @Input() showFooter = true;
  @Input() cardHeight = 0;

  constructor(private playIconService: PlayIconRegistryService) {
    this.playIconService.registerIcons([close]);
  }
}
