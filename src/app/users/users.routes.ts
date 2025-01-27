import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    title: 'Profile',
    loadComponent: () => import('./features/list/users.component').then((c) => c.UsersComponent)
  }
];
