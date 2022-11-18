import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@playground/lms-features';

function ngHTML(html: string) {
  @Component({
    template: `<div [innerHTML]="html"></div>`,
  })
  class _HTMLComponent {
    html = html;
  }

  return _HTMLComponent;
}

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'app',
    loadComponent: () =>
      import('@playground/lms-features').then(
        (c) => c.LmsFeatureSidebarComponent
      ),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: ngHTML(``),
        canLoad: [AuthGuard],
      },
      {
        path: 'training-overview',
        component: ngHTML(``),
        canLoad: [AuthGuard],
      },
      {
        path: 'history',
        component: ngHTML(``),
        canLoad: [AuthGuard],
      },
      {
        path: 'employees',
        component: ngHTML(``),
        canLoad: [AuthGuard],
      },
      {
        path: 'tags',
        canLoad: [AuthGuard],
        loadComponent: () =>
          import('@playground/lms-features').then(
            (c) => c.LmsFeatureTagListComponent
          ),
      },
      {
        path: 'teams',
        component: ngHTML(``),
        canLoad: [AuthGuard],
      },
      {
        path: 'trainings',
        component: ngHTML(``),
        canLoad: [AuthGuard],
      },
      {
        path: 'content',
        canLoad: [AuthGuard],
        loadComponent: () =>
          import('@playground/lms-features').then(
            (c) => c.LmsFeatureContentListComponent
          ),
      },
      {
        path: 'reports',
        component: ngHTML(``),
        canLoad: [AuthGuard],
      },
      {
        path: 'tenants',
        component: ngHTML(``),
        canLoad: [AuthGuard],
      },
      {
        path: 'feedback',
        component: ngHTML(``),
        canLoad: [AuthGuard],
      },
      {
        path: 'settings',
        component: ngHTML(``),
        canLoad: [AuthGuard],
      },
    ],
  },
  {
    path: 'login',
    canLoad: [AuthGuard],
    loadComponent: () =>
      import('@playground/lms-features').then(
        (c) => c.LmsLoginFeatureComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
