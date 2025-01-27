import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    loadComponent: () => import('./features/overview/overview.component').then((c) => c.DashboardOverviewComponent)
  }
];
