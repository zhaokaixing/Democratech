import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

import {HomeComponent} from './home.component';
import {PrivateContentComponent} from './private-content.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'democratech',
    component: PrivateContentComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });

export const routedComponents = [HomeComponent, PrivateContentComponent];
