import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule  } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { CidadeService } from 'src/app/services/domain/cidade.service';
import { EstadoService } from 'src/app/services/domain/estado.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignupPageRoutingModule,
  ],
  providers: [
    CidadeService,
    EstadoService
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
