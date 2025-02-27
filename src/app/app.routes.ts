import { Route } from '@angular/router';
import { auhtRoutes } from './auth/auth.routes';
import { noAuthGuard } from './shared/guards/no-auth.guard';
import { authGuard } from './shared/guards/auth.guard';
import { cashboxesRoutes } from './cashboxes/cashboxes.routes';
import { overviewRoutes } from './overview/overview.routes';

export const appRoutes: Route[] = [
  { path: '', canActivate: [authGuard], loadChildren: () => overviewRoutes },
  { path: '', canActivate: [noAuthGuard], loadChildren: () => auhtRoutes },
  { path: 'cashboxes', canActivate: [authGuard], loadChildren: () => cashboxesRoutes }
];
