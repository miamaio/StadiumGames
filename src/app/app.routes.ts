import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'games',
    loadComponent: () =>
      import('./pages/games/games.component').then((m) => m.GamesComponent),
  },

  {
    path: 'aboutus',
    loadComponent: () =>
      import('./pages/aboutus/aboutus.component').then(
        (m) => m.AboutusComponent
      ),
  },
  { path: '**', redirectTo: 'games', pathMatch: 'full' },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'games',
  },
];
