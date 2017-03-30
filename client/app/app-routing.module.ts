
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }   from './home.component';
import { ProfileComponent } from './profile.component';
import { RegisterComponent } from './register.component';
import {ProjectComponent} from './project.component';
import { AuthGuard } from './service/auth-guard.service';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',  component: HomeComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] },
    { path: 'register', component: RegisterComponent },
    { path: 'project', component: ProjectComponent},
    { path: '**', redirectTo: '/home' }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
