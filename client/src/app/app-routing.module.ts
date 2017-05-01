
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthUserGuardService, AuthAdminGuardService } from './services/auth0-guard.service';

import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from "app/components/project/project.component";
import { RegisterComponent } from "app/components/register/register.component";
import { ProfileComponent } from "app/components/profile/profile.component";
import { HomeAdminComponent } from "app/components/admin/home/home-admin.component";

const routes: Routes = [
    { path: '',  component: HomeComponent, pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent, canActivate: [ AuthUserGuardService ] },
    { path: 'inscription', component: RegisterComponent },
    { path: '#registerCitizen', component: RegisterComponent },
    { path: '#registerOrganisation', component: RegisterComponent },
    { path: 'projet/:id', component: ProjectComponent},
    { path: 'admin', component: HomeAdminComponent, canActivate: [ AuthAdminGuardService ]},
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
