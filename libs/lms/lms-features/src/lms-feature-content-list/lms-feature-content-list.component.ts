import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmsUiContentListComponent } from '@playground/lms-ui';
import { LmsFeatureContentListStore } from './lms-feature-content-list.store';

@Component({
  selector: 'lms-feature-content-list',
  template: `<lms-ui-content-list
    [contentItems]="contentItems$ | async"
    [currentPage]="currentPage$ | async"
    [count]="count$ | async"
    (nextPageClick)="onNextPageClick()"
    (previousPageClick)="onPreviousPageClick()"
    (search)="onSearch($event)"
  ></lms-ui-content-list>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LmsUiContentListComponent],
})
export class LmsFeatureContentListComponent {
  contentItems$ = this.contentStore.contentList$;
  currentPage$ = this.contentStore.currentPage$;
  count$ = this.contentStore.count$;

  onNextPageClick() {
    this.contentStore.nextPage();
  }

  onPreviousPageClick() {
    this.contentStore.previousPage();
  }

  onSearch(searchTerm: string) {
    console.log(searchTerm);
  }

  constructor(private contentStore: LmsFeatureContentListStore) {}
}
