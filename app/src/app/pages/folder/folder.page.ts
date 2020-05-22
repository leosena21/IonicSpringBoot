import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, MenuController, AlertController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/app/models/credenciais.dto';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  
  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(
    private activatedRoute: ActivatedRoute, 
    private navCtrl: NavController, 
    private menu: MenuController,
    public auth: AuthService,
    private alertCtrl: AlertController,
    private storage: StorageService,
    public backgroundMode : BackgroundMode) { }

  ionViewWillEnter(){
    this.menu.swipeGesture(false);
  }

  ionViewDidLeave(){
    this.menu.swipeGesture(true);
  }

  ionViewDidEnter(){
    if(this.storage.getLocalUser()){
      this.auth.refreshToken()
      .subscribe(response => {
        this.auth.sucessfullLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateRoot("categorias");
      },
      error => {});
   }
  }
  

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  public startBackGround(){
    this.backgroundMode.enable();
    this.backgroundMode.on("enable").subscribe(()=>{
      setInterval(() => {
        console.log("GetVelocidade");
       }, 10000);
    });
  }

  login(){
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.sucessfullLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateRoot("categorias");
      },
      error => {
        this.handle401();
      });
  }

  signup(){
    this.navCtrl.navigateForward("signup");
  }

  async handle401(){ //POG MEU BACKEND TÁ RETORNANDO 403, O TRATAMENTO DEVERIA SER REALIZADO NO interceptor(error-interceptor)
    const alert =  await this.alertCtrl.create({
      subHeader: 'Erro 401: falha de autenticação',
      message: 'Email ou senha incorreta',
      buttons:[
        {
          text: 'Ok'
        }
      ]
    });
    await alert.present();
  }
}


