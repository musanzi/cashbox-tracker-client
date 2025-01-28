import { ILink } from '../types/link.type';

export const adminLinks: ILink[] = [
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
    exactUrl: false
  },
  {
    name: 'Caisses',
    path: '/cashboxes',
    icon: 'mat_outline:savings',
    exactUrl: false
  },
  {
    name: 'Transactions',
    path: '/transactions',
    icon: 'mat_outline:swap_horiz',
    exactUrl: false
  }
];
