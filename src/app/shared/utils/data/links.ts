import { ILink } from '../types/link.type';

export const links: ILink[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'mat_outline:dashboard',
    exactUrl: true
  },
  {
    name: 'Utilisateurs',
    path: '/users',
    icon: 'mat_outline:people',
    exactUrl: true
  },
  {
    name: 'Caisses',
    path: '/cashboxes',
    icon: 'mat_outline:savings',
    exactUrl: true
  },
  {
    name: 'Transactions',
    path: '/transactions',
    icon: 'mat_outline:swap_horiz',
    exactUrl: true
  },
  {
    name: 'Mon compte',
    path: '/account',
    icon: 'mat_outline:person',
    exactUrl: true
  }
];
