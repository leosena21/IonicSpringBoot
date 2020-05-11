import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
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
    public auth: AuthService) { }

  ionViewWillEnter(){
    this.menu.swipeGesture(false);
  }

  ionViewDidLeave(){
    this.menu.swipeGesture(true);
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  login(){
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.sucessfullLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateForward("categorias");
      },
      error => {});
  }

}
