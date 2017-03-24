/**
 * Created by flwrnt on 29/01/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }   from './home.component';
import { ProfileComponent } from './profile.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { RegisterComponent } from './register.component';
import { AuthGuard } from './auth-guard.service';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',  component: HomeComponent },
    { path: 'register',  component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
