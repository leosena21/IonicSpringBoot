import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickaddressPageRoutingModule } from './pickaddress-routing.module';

import { PickaddressPage } from './pickaddress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickaddressPageRoutingModule
  ],
  declarations: [PickaddressPage]
})
export class PickaddressPageModule {}
