import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AUTH_PROVIDERS, AuthConfig, AuthHttp, provideAuth } from 'angular2-jwt'; 
import { Auth0Service } from 'app/services/auth0.service';
import { Auth0GuardService } from 'app/services/auth0-guard.service';
import { FlashMessagesModule } from 'angular2-flash-messages/module'

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/project/project.component';
import { RegisterComponent } from './components/register/register.component';

// export function authHttpServiceFactory(http: Http, options: RequestOptions) {
//   console.log("coucou");
//   return new AuthHttp(new AuthConfig({
//     tokenName: 'idToken',
//     tokenGetter: (() => localStorage.getItem('id_token')),
//     globalHeaders: [
//       {'Content-Type':'application/json'}
//     ],
//   }), http, options);
// }

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule, CommonModule,
    FormsModule, ReactiveFormsModule,
    HttpModule, JsonpModule,
    AppRoutingModule,
    FlashMessagesModule
  ],
  providers: [ 
    Auth0Service, Auth0GuardService, AuthHttp, 
    provideAuth({
      headerName: 'Authorization',
      headerPrefix: 'bearer',  
      tokenName: 'token',
      tokenGetter: (() => localStorage.getItem('id_token')), 
      globalHeaders: [{ 'Content-Type': 'application/json' }],
      noJwtError: true
    }) 
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
