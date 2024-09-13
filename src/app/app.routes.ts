import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'Games', 
        loadComponent:  () => import('./pages/games/games.component').then(m  => m.GamesComponent)
    },

    {
        path: 'AboutUs', 
        loadComponent:  () => import('./pages/aboutus/aboutus.component').then(m  => m.AboutusComponent)
    },

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'Games' 
    }
];
