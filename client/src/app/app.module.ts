import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ConfirmModule } from 'angular2-bootstrap-confirm';

import { AUTH_PROVIDERS, AuthConfig, AuthHttp, provideAuth } from 'angular2-jwt';
import { Auth0Service } from 'app/services/auth0.service';
import { AuthUserGuardService, AuthAdminGuardService } from 'app/services/auth0-guard.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { UserService } from "app/services/user.service";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/project/project.component';
import { RegisterComponent } from './components/register/register.component';
import { GlobalProfileService } from "app/services/global.service";
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileCitizenComponent } from './components/profile/profile-citizen/profile-citizen.component';
import { ProfileOrganisationComponent } from './components/profile/profile-organisation/profile-organisation.component';
import { HomeAdminComponent } from './components/admin/home/home-admin.component';
import { UsersAdminComponent } from './components/admin/users/users-admin.component';
import { UserEditComponent } from './components/admin/users/user-edit/user-edit.component';
import { ProjectsAdminComponent } from './components/admin/projects/projects-admin.component';

export function authFactory() {
  return provideAuth({
      headerName: 'Authorization',
      headerPrefix: 'bearer',
      tokenName: 'token',
      tokenGetter: (() => localStorage.getItem('id_token')),
      globalHeaders: [{ 'Content-Type': 'application/json' }],
      noJwtError: true
    })
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileCitizenComponent,
    ProfileOrganisationComponent,
    ProfileOrganisationComponent,
    HomeAdminComponent,
    UsersAdminComponent,
    UserEditComponent,
    ProjectsAdminComponent
  ],
  imports: [
    BrowserModule, CommonModule,
    FormsModule, ReactiveFormsModule,
    HttpModule, JsonpModule,
    AppRoutingModule,
    FlashMessagesModule, ConfirmModule

  ],
  providers: [
    Auth0Service, AuthUserGuardService, AuthAdminGuardService,
    AuthHttp, UserService, GlobalProfileService,
    {
      provide: AuthHttp,
      useFactory:  authFactory
    }
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
