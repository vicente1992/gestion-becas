import { Routes } from '@angular/router';
import { LayoutComponent } from '@core/components/layout/layout.component';
import { AuthGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'grant',
                loadChildren: () => import('@features/user/grant/grant.routes').then((m) => m.routes)
            },
            {
                path: 'application',
                loadChildren: () => import('@features/user/application/application.routes').then((m) => m.routes)
            },
            {
                path: '',
                redirectTo: 'grant',
                pathMatch: 'full',
            },
        ]
    },

]