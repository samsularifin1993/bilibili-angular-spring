import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TranslatePipe} from './pipe/translate.pipe';
import {FormsModule} from "@angular/forms";
import {HomeComponent} from './home/home.component';
import {MessagesComponent} from './messages/messages.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {LibraryComponent} from "./library/library.component";
import {LoginComponent} from "./login/login.component";
import {ErrorComponent} from "./error/error.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {apiSetup} from "./config/api.setup";
import {ApiService} from "./service/api.service";
import {XhrInterceptor} from "./interceptor/xhr.interceptor";
import {ApiInterceptor} from "./interceptor/api.interceptor";
import {windowProvider} from "./config/window.provider";
import {WINDOW} from "./config/inject.token";


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    LibraryComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    TranslatePipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    windowProvider,
    ApiService,
    {
      provide: APP_INITIALIZER,
      useFactory: apiSetup,
      deps: [ApiService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XhrInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
      // Token that we want to inject into
      deps: [WINDOW]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
