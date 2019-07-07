import { Routes } from '@angular/router';
import { DevicesComponent } from './pages/devices/devices.component';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { AuthGuardService } from './auth-guard.service';

export const ROUTES: Routes = [
    {
        path: '',
        component: PagesComponent, children: [
            { path: '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuardService] },
            { path: 'profile', loadChildren: './pages/profile/profile.module#profileModule', canActivate: [AuthGuardService] },
            { path: 'devices', loadChildren: './pages/devices/device.module#deviceModule', canActivate: [AuthGuardService] },
        ]
    },
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
    { path: 'error', component: ErrorComponent },
    { path: '**', component: NotFoundComponent }
];
