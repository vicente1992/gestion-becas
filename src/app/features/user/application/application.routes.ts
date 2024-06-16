import { Routes } from '@angular/router';
import { LayoutComponent } from '@core/components/layout/layout.component';
import { AuthGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '', loadComponent: () => import('./pages/applications/applications.component')
    },



]