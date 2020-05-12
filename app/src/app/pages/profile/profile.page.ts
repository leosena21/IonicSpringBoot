import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { ClienteDTO } from 'src/app/models/cliente.dto';
import { ClienteService } from 'src/app/services/domain/cliente.service';
import { API_CONFIG } from 'src/app/config/api.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDTO;

  constructor(
    private navCtrl: NavController,
    public storage: StorageService,
    public clienteService: ClienteService
  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    console.log(localUser);
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response;
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
}
