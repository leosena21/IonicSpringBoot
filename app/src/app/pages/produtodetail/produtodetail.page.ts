import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/app/models/produto.dto';
import { NavParams, NavController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { ProdutoService } from 'src/app/services/domain/produto.service';
import { API_CONFIG } from 'src/app/config/api.config';
import { CartService } from 'src/app/services/domain/cart.service';

@Component({
  selector: 'app-produtodetail',
  templateUrl: './produtodetail.page.html',
  styleUrls: ['./produtodetail.page.scss'],
})
export class ProdutodetailPage implements OnInit {

  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private route: ActivatedRoute,
    public produtoService: ProdutoService,
    public cartService: CartService
  ) { }

  ngOnInit() {

    let produto_id;

    this.route.queryParams.subscribe(params => {
      produto_id = params["produto_id"];
    });

    this.produtoService.findById(produto_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExist();
      },
      error => {});
  }

  getImageUrlIfExist(){
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      error =>{});
  }

  back(){
    this.navCtrl.back();
  }

  cart(produto: ProdutoDTO){
    
    this.cartService.addProduto(produto);

    this.navCtrl.navigateRoot("cart");
  }
  

}
