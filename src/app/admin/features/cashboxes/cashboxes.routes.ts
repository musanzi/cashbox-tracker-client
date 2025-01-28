import { Routes } from '@angular/router';

export const cashboxesRoutes: Routes = [
  {
    path: '',
    title: 'Caisses',
    loadComponent: () => import('./list/cashboxes.component').then((c) => c.CashboxesComponent)
  }
];
