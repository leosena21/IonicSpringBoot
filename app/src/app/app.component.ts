import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './services/storage.service';
import { ClienteService } from './services/domain/cliente.service';
import { ClienteDTO } from './models/cliente.dto';
import { API_CONFIG } from './config/api.config';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  
  cliente: ClienteDTO;

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Categorias',
      url: '/categorias',
      icon: 'apps'
    },
    {
      title: 'Carrinho',
      url: '/cart',
      icon: 'cart'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'paper-plane'
    },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    public storage: StorageService,
    public clienteService: ClienteService,
    public authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          this.getImageIfExist();
        },
        error => {});
    }
  }

  getImageIfExist(){
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
      error =>{});
  }

  logout(){
    this.authService.logout();
    this.navCtrl.navigateRoot("folder/inbox");
  }
}
