
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }   from './home.component';
import { ProfileComponent } from './profile.component';
import {ProjectComponent} from './project.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './auth-guard.service';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',  component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'project', component: ProjectComponent},
    { path: '**', redirectTo: '/home' }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
