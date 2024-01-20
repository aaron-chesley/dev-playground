import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LmsContentItem } from '@playground/lms-util';
import {
  PlayButtonComponent,
  PlayInputTextComponent,
  PlayPaginatorComponent,
} from '@playground/play-ui';
import { Subject, takeUntil } from 'rxjs';
import { LmsUiVideoItemComponent } from '../lms-ui-video-item/lms-ui-video-item.component';

@Component({
  selector: 'lms-ui-content-list',
  templateUrl: './lms-ui-content-list.component.html',
  styleUrls: ['./lms-ui-content-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LmsUiVideoItemComponent,
    PlayPaginatorComponent,
    PlayInputTextComponent,
    PlayButtonComponent,
  ],
})
export class LmsUiContentListComponent implements OnInit, OnDestroy {
  @HostBinding('class.lms-ui-content-list') lmsUiContentListClass =
    'lms-ui-content-list';
  @Input() contentItems: LmsContentItem[] = [];
  @Input() count = 0;
  @Input() itemsPerPage = 8;
  @Input() currentPage = 1;

  @Output() nextPageClick = new EventEmitter<void>();
  @Output() previousPageClick = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();
  @Output() createNewContent = new EventEmitter();
  @Output() contentItemClick = new EventEmitter<LmsContentItem>();

  _ngDestroy$ = new Subject<void>();
  _searchCtrl = new FormControl('');

  ngOnInit() {
    this._searchCtrl.valueChanges
      .pipe(takeUntil(this._ngDestroy$))
      .subscribe((val) => this.search.emit(val));
  }

  ngOnDestroy() {
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
  }
}
