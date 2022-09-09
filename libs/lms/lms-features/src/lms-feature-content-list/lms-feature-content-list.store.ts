import { Injectable } from '@angular/core';
import { LmsDataContentService } from '@playground/lms-data';
import { LmsContentItem } from '@playground/lms/lms-util';
import { getDefaultPaginated, Paginated } from '@playground/shared/shared-util';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

interface ContentListState {
  contentList: Paginated<LmsContentItem>;
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class LmsFeatureContentListStore {
  private contentListStateSub = new BehaviorSubject<ContentListState>({
    contentList: getDefaultPaginated(),
    loading: false,
  });

  private get contentListState() {
    return this.contentListStateSub.getValue();
  }

  // Selectors
  readonly contentListState$ = this.contentListStateSub
    .asObservable()
    .pipe(shareReplay());

  readonly contentList$ = this.contentListState$.pipe(
    map((state) => state.contentList.results)
  );

  readonly currentPage$ = this.contentListState$.pipe(
    map((state) => state.contentList.page_number)
  );

  readonly count$ = this.contentListState$.pipe(
    map((state) => state.contentList.count)
  );

  readonly loading$ = this.contentListState$.pipe(
    map((state) => state.loading)
  );

  // Reducers
  private patchState(state: Partial<ContentListState>) {
    this.contentListStateSub.next({
      ...this.contentListState,
      ...state,
    });
  }

  // Actions
  private fetchContentList(searchTerm = '', pageNo = '1') {
    this.patchState({ loading: true });

    this.contentService
      .searchContent(searchTerm, pageNo)
      .pipe(
        catchError((err) => {
          this.patchState({ loading: false });
          return throwError(() => err);
        })
      )
      .subscribe((contentList) => {
        this.patchState({ contentList: contentList, loading: false });
      });
  }

  deleteContent(content: LmsContentItem) {
    return this.contentService
      .deleteContent(content.id)
      .pipe(tap(() => this.fetchContentList()));
  }

  nextPage(): void {
    const nextPageNo = this.contentListState.contentList.page_number + 1;
    this.fetchContentList('', nextPageNo.toString());
  }

  previousPage() {
    const previousPageNo = this.contentListState.contentList.page_number - 1;
    this.fetchContentList('', previousPageNo.toString());
  }

  constructor(private contentService: LmsDataContentService) {
    this.fetchContentList();
  }
}
