import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickaddressPage } from './pickaddress.page';

const routes: Routes = [
  {
    path: '',
    component: PickaddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickaddressPageRoutingModule {}
