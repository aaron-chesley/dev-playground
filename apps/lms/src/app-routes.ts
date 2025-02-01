import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthGuard } from '@playground/lms-features';

function ngHTML(html: string) {
  @Component({
    template: `<div [innerHTML]="html"></div>`,
    host: { 'collision-id': Math.random().toString(36).substring(2) },
    standalone: false
})
  class _HTMLComponent {
    html = html;
  }

  return _HTMLComponent;
}

export const routes: Routes = [
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
        canLoad: [AuthGuard],
        loadComponent: () =>
          import('@playground/lms-features').then(
            (c) => c.LmsFeatureEmployeeManagementComponent
          ),
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
        path: 'content/:id',
        canLoad: [AuthGuard],
        loadComponent: () =>
          import('@playground/lms-features').then(
            (c) => c.LmsFeatureContentDetailsComponent
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
  {
    path: '',
    redirectTo: '/app/dashboard',
    pathMatch: 'full',
  },
];
