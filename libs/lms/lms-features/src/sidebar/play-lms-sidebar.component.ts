import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, Observable } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthUser, LmsAuthenticationService } from '@playground/lms-data';
import { PlaySidenavModule } from '@playground/play-ui';

@Component({
  selector: 'play-lms-sidebar',
  templateUrl: './play-lms-sidebar.component.html',
  styleUrls: ['./play-lms-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    PlaySidenavModule,
  ],
})
export class PlayLmsSidebarComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', { static: true }) drawerRef: any;
  collapsed: boolean;
  searchText: string;
  results: any[];
  ngUnsubscribe$: Subject<void> = new Subject<void>();
  tenantSearchForm: FormGroup;
  filteredTenants: Observable<any>;
  showLoadingIndicator = false;
  currentUser$: Observable<AuthUser>;

  mobileView: boolean;
  drawerOpened: boolean;
  drawerMode: MatDrawerMode;

  constructor(
    public breakpointObserver: BreakpointObserver,
    public router: Router,
    private authService: LmsAuthenticationService
  ) {}

  ngOnInit() {
    this.manageScreenSize();
    this.currentUser$ = this.authService.me().pipe(shareReplay());
  }

  public ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  logout() {}

  closeNav() {
    if (this.mobileView) {
      this.drawerRef['opened'] = false;
    }
  }

  private manageScreenSize() {
    /* Subscribe to screen size. */
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((result) => {
        if (result.matches) {
          this.mobileView = true;
          this.drawerMode = 'over';
          this.drawerOpened = false;
        } else {
          this.mobileView = false;
          this.drawerMode = 'side';
          this.drawerOpened = true;
        }
      });
  }

  displayFn(tenant: any) {
    if (tenant) {
      return tenant.name;
    }
  }

  public handleDrawerClose(drawer: any) {
    if (this.mobileView) {
      drawer.close();
    }
  }
}
