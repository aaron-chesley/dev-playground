import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmsUiContentListComponent } from '@playground/lms-ui';
import { LmsContentItem } from '@playground/lms/lms-util';
import { map, Observable } from 'rxjs';
import { LmsFeatureContentListStore } from './lms-feature-content-list.store';

@Component({
  selector: 'lms-feature-content-list',
  template: `<lms-ui-content-list
    [contentItems]="contentItems$ | async"
    [currentPage]="currentPage$ | async"
    [count]="count$ | async"
    (nextPageClick)="onNextPageClick()"
    (previousPageClick)="onPreviousPageClick()"
  ></lms-ui-content-list>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LmsUiContentListComponent],
})
export class LmsFeatureContentListComponent {
  currentPage$: Observable<number> = this.contentStore.currentPage$;
  contentItems$: Observable<LmsContentItem[]> =
    this.contentStore.contentList$.pipe(map((x) => x.results));
  count$: Observable<number> = this.contentStore.contentList$.pipe(
    map((x) => x.count)
  );

  onNextPageClick() {
    this.contentStore.nextPage();
  }

  onPreviousPageClick() {
    this.contentStore.previousPage();
  }

  constructor(private contentStore: LmsFeatureContentListStore) {}
}
