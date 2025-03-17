import { Route } from '@angular/router';
import { auhtRoutes } from './auth/auth.routes';
import { unauthGuard } from './shared/guards/no-auth.guard';
import { authGuard } from './shared/guards/auth.guard';
import { cashboxesRoutes } from './cashboxes/cashboxes.routes';
import { overviewRoutes } from './overview/overview.routes';
import { transactionsRoutes } from './transactions/transactions.routes';
import { LayoutComponent } from './shared/layout/layout.component';
import { transfersRoutes } from './transfers/transfers.routes';
import { usersRoutes } from './users/users.routes';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'auth' },
    canActivate: [authGuard],
    loadChildren: () => overviewRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'unauth' },
    canActivate: [unauthGuard],
    loadChildren: () => auhtRoutes
  },
  {
    path: 'cashboxes',
    component: LayoutComponent,
    data: { layout: 'auth' },
    canActivate: [authGuard],
    loadChildren: () => cashboxesRoutes
  },
  {
    path: 'transactions',
    component: LayoutComponent,
    data: { layout: 'auth' },
    canActivate: [authGuard],
    loadChildren: () => transactionsRoutes
  },
  {
    path: 'transfers',
    component: LayoutComponent,
    data: { layout: 'auth' },
    canActivate: [authGuard],
    loadChildren: () => transfersRoutes
  },
  {
    path: 'users',
    component: LayoutComponent,
    data: { layout: 'auth' },
    canActivate: [authGuard],
    loadChildren: () => usersRoutes
  }
];
