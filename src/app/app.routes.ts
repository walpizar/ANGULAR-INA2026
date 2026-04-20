import { Routes } from '@angular/router';

export const routes: Routes = [
  //guard
  { path: '', loadComponent: () => import('./pages/auth/login/login').then((m) => m.Login) },
  { path: 'inicio', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  { path: 'login', loadComponent: () => import('./pages/auth/login/login').then((m) => m.Login) },
];
