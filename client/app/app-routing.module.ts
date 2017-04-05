/**
 * Created by flwrnt on 29/01/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }   from './home.component';
import { ProfileComponent } from './profile.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { RegisterComponent } from './register.component';
import { AuthGuard } from './service/auth-guard.service';
import {RegisterCitizenComponent} from "./registerCitizen.component";
import {RegisterOrganisationComponent} from "./registerOrganisation.component";


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',  component: HomeComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] },
    { path: 'register', component: RegisterComponent },
    { path: 'registerCitizen', component: RegisterCitizenComponent },
    { path: 'registerOrganisation', component: RegisterOrganisationComponent },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
