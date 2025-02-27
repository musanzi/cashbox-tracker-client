import { Route } from '@angular/router';

export const overviewRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./features/overview.component').then((c) => c.OverviewComponent)
  }
];
