import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { PlayLoadingDirective } from '@playground/play-ui';

@Component({
  selector: 'lms-ui-sidebar',
  templateUrl: './lms-ui-sidebar.component.html',
  styleUrls: ['./lms-ui-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatSidenavModule, PlayLoadingDirective],
})
export class LmsUiSidebarComponent implements OnInit {
  @Input() isLoading = false;
  drawerMode: MatDrawerMode;
  drawerOpened: boolean;

  ngOnInit() {
    this.manageScreenSize();
  }

  private manageScreenSize() {
    /* Subscribe to screen size. */
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe((result) => {
        if (result.matches) {
          this.drawerMode = 'over';
          this.drawerOpened = false;
        } else {
          this.drawerMode = 'side';
          this.drawerOpened = true;
        }
        this.cdr.detectChanges();
      });
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {}
}
