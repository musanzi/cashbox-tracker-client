import { Route } from '@angular/router';
import { auhtRoutes } from './auth/auth.routes';
import { noAuthGuard } from './shared/guards/no-auth.guard';
import { authGuard } from './shared/guards/auth.guard';
import { adminRoutes } from './admin/admin.routes';

export const appRoutes: Route[] = [
  { path: '', canActivate: [authGuard], loadChildren: () => adminRoutes },
  { path: '', canActivate: [noAuthGuard], loadChildren: () => auhtRoutes }
];
