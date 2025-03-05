import { Routes } from '@angular/router';

export const transfersRoutes: Routes = [
  {
    path: '',
    title: 'Transfers',
    loadComponent: () => import('./features/list/transfers.component').then((c) => c.TransfersComponent)
  }
];
