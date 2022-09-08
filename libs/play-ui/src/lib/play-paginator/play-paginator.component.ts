import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { PlayIconRegistryService } from '../play-icon/play-icon-registry.service';
import { PlayIconComponent } from '../play-icon/play-icon.component';
import { arrowBack, arrowForward } from '../play-icon/play-icons';
import { PlayTextComponent } from '../play-typography/play-text/play-text.component';

@Component({
  selector: 'play-paginator',
  templateUrl: './play-paginator.component.html',
  styleUrls: ['./play-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    PlayButtonComponent,
    PlayIconComponent,
    PlayTextComponent,
  ],
})
export class PlayPaginatorComponent implements OnInit {
  totalPages = 0;

  @Input() count = 0;
  @Input() itemsPerPage = 10;
  @Input() currentPage = 1;

  ngOnInit() {
    this.setTotalPages(this.count, this.itemsPerPage);
  }

  private setTotalPages(count: number, itemsPerPage: number) {
    this.totalPages = Math.ceil(count / itemsPerPage) || 1;
  }

  constructor(private playIconService: PlayIconRegistryService) {
    this.playIconService.registerIcons([arrowBack, arrowForward]);
  }
}
