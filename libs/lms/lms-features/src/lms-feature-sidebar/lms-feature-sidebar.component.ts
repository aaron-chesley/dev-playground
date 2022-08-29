import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthUser, LmsAuthenticationService } from '@playground/lms-data';
import {
  LmsUiSidebarComponent,
  LmsUiSidebarItemComponent,
} from '@playground/lms-ui';
import {
  assignment,
  business,
  dashboard,
  equalizer,
  groupWork,
  history,
  logout,
  loyalty,
  PlayIconComponent,
  PlayIconRegistryService,
  settings,
  supervisedUserCircle,
  videoLibrary,
} from '@playground/play-ui';
import { RouterModule } from '@angular/router';
import { getNavLinksFromUserType, LmsNavLink } from './lms-nav-links';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lms-feature-sidebar',
  templateUrl: './lms-feature-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LmsUiSidebarComponent,
    LmsUiSidebarItemComponent,
    PlayIconComponent,
  ],
})
export class LmsFeatureSidebarComponent implements OnInit {
  currentUser$: Observable<AuthUser>;
  lmsNavLinks$: Observable<LmsNavLink[]>;

  ngOnInit() {
    this.currentUser$ = this.authService.me().pipe(shareReplay());
    this.lmsNavLinks$ = this.currentUser$.pipe(map(getNavLinksFromUserType));
  }

  onLogoutClick() {
    this.authService.purgeAuth();
    location.reload();
  }

  constructor(
    private authService: LmsAuthenticationService,
    private playIconService: PlayIconRegistryService
  ) {
    this.playIconService.registerIcons([
      dashboard,
      history,
      supervisedUserCircle,
      equalizer,
      settings,
      loyalty,
      groupWork,
      assignment,
      videoLibrary,
      business,
      logout,
    ]);
  }
}
