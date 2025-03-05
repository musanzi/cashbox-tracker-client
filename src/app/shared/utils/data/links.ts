import { ILink } from '../types/link.type';

export const adminLinks: ILink[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'mat_outline:dashboard',
    exactUrl: true
  },
  {
    name: 'Caisses',
    path: '/cashboxes',
    icon: 'mat_outline:payments',
    exactUrl: false
  },
  {
    name: 'Transactions',
    path: '/transactions',
    icon: 'mat_outline:account_balance_wallet',
    exactUrl: false
  },
  {
    name: 'Transferts',
    path: '/transfers',
    icon: 'mat_outline:sync_alt',
    exactUrl: false
  }
  // {
  //   name: 'Utilisateurs',
  //   path: '/users',
  //   icon: 'mat_outline:people',
  //   exactUrl: false
  // }
];
