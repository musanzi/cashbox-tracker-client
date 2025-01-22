import { ILink } from '../types/link.type';

export const links: ILink[] = [
  {
    name: 'Utilisateurs',
    path: '/users',
    icon: 'mat_outline:person',
    exactUrl: true
  },
  {
    name: 'Caisses',
    path: '/',
    icon: 'mat_outline:person',
    exactUrl: true
  },
  {
    name: 'Transferts',
    path: '/transfers',
    icon: 'mat_outline:compare_arrows',
    exactUrl: true
  }
];
