import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LmsUiContentDetailComponent } from '@playground/lms-ui';
import { BehaviorSubject, finalize, map, shareReplay } from 'rxjs';
import { LmsContentItem } from '@playground/lms-util';
import { ActivatedRoute } from '@angular/router';
import { LmsDataContentService } from '@playground/lms-data';

interface ContentDetailsState {
  contentDetails: LmsContentItem;
  loading: boolean;
}

@Component({
  selector: 'lms-feature-content-detail',
  template: `<lms-ui-content-detail
    [content]="content$ | async"
  ></lms-ui-content-detail>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, LmsUiContentDetailComponent],
})
export class LmsFeatureContentDetailsComponent implements OnInit {
  private contentDetailsStateSub = new BehaviorSubject<ContentDetailsState>({
    contentDetails: null,
    loading: false,
  });

  private get contentDetailsState(): ContentDetailsState {
    return this.contentDetailsStateSub.value;
  }

  private set contentDetailsState(
    contentDetails: Partial<ContentDetailsState>
  ) {
    this.contentDetailsStateSub.next({
      ...this.contentDetailsState,
      ...contentDetails,
    });
  }

  contentDetailsState$ = this.contentDetailsStateSub
    .asObservable()
    .pipe(shareReplay());

  content$ = this.contentDetailsState$.pipe(
    map((state) => state.contentDetails),
    shareReplay()
  );

  loading$ = this.contentDetailsState$.pipe(
    map((state) => state.loading),
    shareReplay()
  );

  fetchContentDetails() {
    this.contentDetailsState = { loading: true };
    const id = this.route.snapshot.paramMap.get('id');
    this.contentService
      .getContent(id)
      .pipe(
        finalize(() => {
          this.contentDetailsState = { loading: false };
        })
      )
      .subscribe((contentDetails) => {
        this.contentDetailsState = {
          contentDetails: contentDetails,
          loading: false,
        };
      });
  }

  ngOnInit() {
    this.fetchContentDetails();
  }

  constructor(
    private route: ActivatedRoute,
    private contentService: LmsDataContentService
  ) {}
}
