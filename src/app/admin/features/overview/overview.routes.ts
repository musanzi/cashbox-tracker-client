import { Route } from '@angular/router';

export const overviewRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./overview.component').then((c) => c.OverviewComponent)
  }
];
