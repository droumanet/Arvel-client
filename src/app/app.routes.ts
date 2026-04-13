import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'modules',
    pathMatch: 'full'
  },
  {
    path: 'modules',
    loadChildren: () =>
      import('./features/modules/modules.routes').then(m => m.MODULES_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'modules'
  }
];
