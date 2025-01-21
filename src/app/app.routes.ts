import { Route } from '@angular/router';
import { auhtRoutes } from './auth/auth.routes';
import { profileRoutes } from './profile/profile.routes';
import { noAuthGuard } from './shared/guards/no-auth.guard';
import { authGuard } from './shared/guards/auth.guard';

export const appRoutes: Route[] = [
  { path: 'me', canActivate: [authGuard], loadChildren: () => profileRoutes },
  { path: '', canActivate: [noAuthGuard], loadChildren: () => auhtRoutes }
  // { path: '**', loadChildren: () => landingRoutes }
];
