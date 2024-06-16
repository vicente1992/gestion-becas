import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthStore } from '@shared/store/Auth.store';

export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('@features/auth/auth.routes').then((m) => m.routes)
    },

    {
        path: 'user',
        loadChildren: () => import('@features/user/users.routes').then((m) => m.routes)
    },
    {
        path: 'admin',
        loadChildren: () => import('@features/admin/admin.routes').then((m) => m.routes)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: () => {
            const userRole = inject(AuthStore).user().role;
            if (userRole === 'admin') {
                return 'admin';
            }
            return 'user';

        }
    }
];
