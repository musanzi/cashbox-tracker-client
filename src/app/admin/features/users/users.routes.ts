import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    title: 'Utilisateurs',
    loadComponent: () => import('./list/users.component').then((c) => c.UsersComponent)
  }
];
