import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LmsUiContentCreateComponent,
  LmsUiContentListComponent,
} from '@playground/lms-ui';
import { LmsContentItemCreate } from '@playground/lms/lms-util';
import { PlayModalModule, PlayModalService } from '@playground/play-ui';
import { filter } from 'rxjs';
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
    (createNewContent)="onCreateNewContent()"
  ></lms-ui-content-list>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LmsUiContentListComponent, PlayModalModule],
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

  onCreateNewContent() {
    this.modalService
      .custom<LmsUiContentCreateComponent, null, LmsContentItemCreate>(
        LmsUiContentCreateComponent
      )
      .closed.pipe(filter(Boolean))
      .subscribe((contentItem) => {
        this.contentStore.createContent(contentItem);
      });
  }

  constructor(
    private contentStore: LmsFeatureContentListStore,
    private modalService: PlayModalService
  ) {}
}
