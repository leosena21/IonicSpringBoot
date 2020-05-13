import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutodetailPageRoutingModule } from './produtodetail-routing.module';

import { ProdutodetailPage } from './produtodetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdutodetailPageRoutingModule
  ],
  declarations: [ProdutodetailPage]
})
export class ProdutodetailPageModule {}
