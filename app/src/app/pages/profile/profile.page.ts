import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email: string;

  constructor(
    private navCtrl: NavController,
    public storage: StorageService
  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    console.log(localUser);
    if(localUser && localUser.email){
      this.email = localUser.email;
    }
  }
}
