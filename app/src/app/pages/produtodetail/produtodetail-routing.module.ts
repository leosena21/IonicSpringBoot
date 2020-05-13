import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutodetailPage } from './produtodetail.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutodetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutodetailPageRoutingModule {}
