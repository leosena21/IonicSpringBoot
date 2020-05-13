import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { StorageService } from 'src/app/services/storage.service';
import { ProdutoService } from 'src/app/services/domain/produto.service';
import { API_CONFIG } from 'src/app/config/api.config';
import { CartService } from 'src/app/services/domain/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: CartItem[];

  constructor(
    public cartService: CartService,
    public produtoService: ProdutoService
  ) { }

  ngOnInit() {
    let cart = this.cartService.getCart();
    this.items = cart.itens;
    this.loadImageUrls();
  }

  loadImageUrls(){
    for(var i=0; i<this.items.length; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
      .subscribe(response => {
        item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
      },
      error =>{});
    }
  }

}
