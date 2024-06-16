import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadComponent: () => import('./pages/grant/grant.component')
    },
    {
        path: ':id', loadComponent: () => import('./pages/detail/detail.component')
    }
];
