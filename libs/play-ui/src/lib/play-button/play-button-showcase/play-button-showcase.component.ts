import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayIconRegistryService } from '../../play-icon/play-icon-registry.service';
import { PlayIconComponent } from '../../play-icon/play-icon.component';
import { home } from '../../play-icon/play-icons';
import { PlayButtonComponent } from '../play-button.component';

@Component({
  selector: 'play-button-showcase',
  templateUrl: './play-button-showcase.component.html',
  styleUrls: ['./play-button-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PlayButtonComponent, PlayIconComponent],
})
export class PlayButtonShowcaseComponent {
  constructor(private iconService: PlayIconRegistryService) {
    this.iconService.registerIcons([home]);
  }
}
