import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/app/models/produto.dto';
import { NavController, NavParams } from '@ionic/angular';
import { ProdutoService } from 'src/app/services/domain/produto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let categoria_id;

    this.route.queryParams.subscribe(params => {
      categoria_id = params["categoria_id"];
    });

    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
      },
      error => {});
    }

  back(){
    this.navCtrl.back();
  }
}
