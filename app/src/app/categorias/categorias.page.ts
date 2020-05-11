import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CategoriaService } from '../services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    public categoriaService: CategoriaService
  ) { }

  ionViewDidEnter(){
    console.log("OK");
    this.categoriaService.findAll()
      .subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }


  ngOnInit() {
  }

}
