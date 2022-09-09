import { Injectable } from '@angular/core';
import { LmsDataContentService } from '@playground/lms-data';
import { LmsContentItem } from '@playground/lms/lms-util';
import { getDefaultPaginated, Paginated } from '@playground/shared/shared-util';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LmsFeatureContentListStore {
  private contentListSub = new BehaviorSubject<Paginated<LmsContentItem>>(
    getDefaultPaginated()
  );
  readonly contentList$: Observable<Paginated<LmsContentItem>> =
    this.contentListSub.asObservable().pipe(shareReplay());

  private currentPageSub = new BehaviorSubject<number>(1);
  readonly currentPage$ = this.currentPageSub.asObservable();

  fetchContentList() {
    this.contentService
      .searchContent()
      .subscribe((contentList) => this.contentListSub.next(contentList));
  }

  deleteContent(content: LmsContentItem) {
    return this.contentService
      .deleteContent(content.id)
      .pipe(tap(() => this.fetchContentList()));
  }

  nextPage() {
    const currentPage = this.currentPageSub.getValue();
    this.contentService
      .searchContent('', (currentPage + 1).toString())
      .subscribe((contentList) => {
        this.contentListSub.next(contentList);
        this.currentPageSub.next(currentPage + 1);
      });
  }

  previousPage() {
    const currentPage = this.currentPageSub.getValue();
    this.contentService
      .searchContent('', (currentPage - 1).toString())
      .subscribe((contentList) => {
        this.contentListSub.next(contentList);
        this.currentPageSub.next(currentPage - 1);
      });
  }

  constructor(private contentService: LmsDataContentService) {
    this.fetchContentList();
  }
}
