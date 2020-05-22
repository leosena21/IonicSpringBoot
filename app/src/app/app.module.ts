import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriaService } from './services/domain/categoria.service';
import { ErrorInterceptorProvider } from './interceptors/error-interceptor';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { ClienteService } from './services/domain/cliente.service';
import {AuthInterceptorProvider } from './interceptors/auth-interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProdutoService } from './services/domain/produto.service';
import { CartService } from './services/domain/cart.service';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NavParams,
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService, 
    ProdutoService,
    CartService,
    BackgroundMode
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
