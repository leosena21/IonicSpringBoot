import { Component, OnInit } from '@angular/core';
import { EnderecoDTO } from 'src/app/models/endereco.dto';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { ClienteService } from 'src/app/services/domain/cliente.service';

@Component({
  selector: 'app-pickaddress',
  templateUrl: './pickaddress.page.html',
  styleUrls: ['./pickaddress.page.scss'],
})
export class PickaddressPage implements OnInit {

  items: EnderecoDTO[];

  constructor(
    private navCtrl: NavController,
    public storage: StorageService,
    public clienteService: ClienteService) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];
        },
        error => {
          if(error.status == 403){
            this.navCtrl.navigateRoot("folder/Inbox");
          }
        });
    }
    else{
      this.navCtrl.navigateRoot("folder/Inbox");
    }
  }

}
