import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items: CategoriaDTO[];

  constructor(
    private navCtrl: NavController,
    public categoriaService: CategoriaService
  ) { }

  ionViewDidEnter(){
    console.log("OK");
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => { });
  }


  ngOnInit() {
  }

}
