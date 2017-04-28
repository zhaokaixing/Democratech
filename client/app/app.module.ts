import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }  from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { FlashMessagesModule } from 'angular2-flash-messages'

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile.component';
import { RegisterComponent } from './register.component';
import {ProjectComponent} from './project.component'

import { LoadingAnimateModule, LoadingAnimateService } from 'ng2-loading-animate';

import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth-guard.service';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { AppRoutingModule } from './app-routing.module';
import {CitizenService} from "./service/citizen.service";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    FlashMessagesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCPFGAlVK4bEA8olgRQ11w319TRcRjhH4A'
    }),
    LoadingAnimateModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    RegisterComponent,
    ProjectComponent
  ],
  providers: [
      CitizenService,
    AUTH_PROVIDERS,
    AuthService,
    AuthGuard,
    LoadingAnimateService
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
