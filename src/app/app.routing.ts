import { RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ROUTES } from './app.routes';

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES, {
    preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
    // useHash: true
});
