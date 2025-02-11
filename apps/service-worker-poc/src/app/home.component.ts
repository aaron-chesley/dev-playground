import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-home',
  template: `
    <mat-sidenav-container class="example-container" hasBackdrop="false">
      <mat-sidenav class="example-sidenav" #sidenav mode="push" opened="false"> sidenav </mat-sidenav>

      <mat-sidenav-content class="example-sidenav-content">
        <!-- <button type="button" mat-button (click)="sidenav.toggle()">Toggle sidenav</button> -->
        <mat-drawer-container class="example-container" hasBackdrop="false">
          <mat-drawer #drawer class="example-sidenav" mode="over" opened="true">
            <p>This is the drawer!</p>
            <router-outlet name="slideout"></router-outlet>
          </mat-drawer>

          <div class="example-sidenav-content">
            <button type="button" mat-button (click)="drawer.toggle()">Toggle drawer</button>
            <button type="button" mat-button (click)="navigateToSlideout()">Navigate to slideout</button>
          </div>
        </mat-drawer-container>
        <!-- Add this line for auxiliary route -->
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
      }
      .example-container {
        width: 100%;
        height: 100%;
      }

      .example-sidenav-content {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
      }

      .example-sidenav {
        padding: 20px;
        width: 450px;
      }
    `,
  ],
})
export class HomeComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.children.forEach((child) => {
      console.log('Activated Child Route:', child.outlet);
    });
  }
  navigateToSlideout() {
    this.router.navigate(['/home', { outlets: { slideout: 'slideout-a' } }]);
  }
}
