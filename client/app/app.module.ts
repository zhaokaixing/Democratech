import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }  from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile.component';
import { RegisterComponent } from './register.component';

import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth-guard.service';

import { AppRoutingModule } from './app-routing.module';
import {RegisterCitizenComponent} from "./registerCitizen.component";
import {RegisterOrganisationComponent} from "./registerOrganisation.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    RegisterComponent,
    RegisterCitizenComponent,
    RegisterOrganisationComponent
  ],
  providers: [
    AUTH_PROVIDERS,
    AuthService,
    AuthGuard
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
