import { Route } from '@angular/router';
import { auhtRoutes } from './auth/auth.routes';
import { profileRoutes } from './profile/profile.routes';
import { noAuthGuard } from './shared/guards/no-auth.guard';
import { authGuard } from './shared/guards/auth.guard';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { cashboxesRoutes } from './cashboxes/cashboxes.routes';
import { transactionsRoutes } from './transactions/transactions.routes';
import { usersRoutes } from './users/users.routes';

export const appRoutes: Route[] = [
  { path: '', canActivate: [authGuard], loadChildren: () => dashboardRoutes },
  { path: 'account', canActivate: [authGuard], loadChildren: () => profileRoutes },
  { path: 'users', canActivate: [authGuard], loadChildren: () => usersRoutes },
  { path: 'cashboxes', canActivate: [authGuard], loadChildren: () => cashboxesRoutes },
  { path: 'transactions', canActivate: [authGuard], loadChildren: () => transactionsRoutes },
  { path: '', canActivate: [noAuthGuard], loadChildren: () => auhtRoutes }
];
