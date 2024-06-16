import { Routes } from "@angular/router";
import { LayoutAdminComponent } from "@core/components/layout-admin/layout-admin.component";
import { AuthGuard } from "@core/guards/auth.guard";

export const routes: Routes = [
    {
        path: '',
        component: LayoutAdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'grant',
                loadChildren: () => import('@features/admin/grant/grant.routes').then((m) => m.routes)
            },
            {
                path: 'application',
                loadComponent: () => import('@features/admin/application/pages/applications/applications.component')
            },
            {
                path: '',
                redirectTo: 'grant',
                pathMatch: 'full',
            },
        ]
    },
]