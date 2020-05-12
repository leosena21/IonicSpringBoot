import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, MenuController, AlertController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/app/models/credenciais.dto';
import { AuthService } from 'src/app/services/auth.service';

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
    private alertCtrl: AlertController) { }

  ionViewWillEnter(){
    this.menu.swipeGesture(false);
  }

  ionViewDidLeave(){
    this.menu.swipeGesture(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
    .subscribe(response => {
      this.auth.sucessfullLogin(response.headers.get('Authorization'));
      this.navCtrl.navigateRoot("categorias");
    },
    error => {});
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
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


