import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';
import { Cart } from 'src/app/models/cart';
import { ProdutoDTO } from 'src/app/models/produto.dto';

@Injectable({
  providedIn: 'root',
})
export class CartService{
  constructor(public storage: StorageService){
  }

  createorClearCart(): Cart{
    let cart: Cart = {itens: []};
    this.storage.setCart(cart);
    return cart;
  }

  getCart(): Cart{
    let cart: Cart = this.storage.getCart();
    if(cart == null){
      cart = this.createorClearCart();
    }
    return cart;
  }

  addProduto(produto: ProdutoDTO){
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.id == produto.id);

    if(position == -1){
      cart.itens.push({quantidade: 1, produto: produto});
    }
    this.storage.setCart(cart);
    return cart;
  }

  removeProduto(produto: ProdutoDTO){
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.id == produto.id);

    if(position != -1){
      cart.itens.splice(position, 1);
    }
    this.storage.setCart(cart);
    return cart;
  }

  increaseQuantity(produto: ProdutoDTO){
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.id == produto.id);

    if(position != -1){
      cart.itens[position].quantidade++;
    }
    this.storage.setCart(cart);
    return cart;
  }

  decreaseQuantity(produto: ProdutoDTO){
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.id == produto.id);

    if(position != -1){
      cart.itens[position].quantidade--;
      if(cart.itens[position].quantidade < 1){
        cart = this.removeProduto(produto);
      }
    }
    this.storage.setCart(cart);
    return cart;
  }

  total(): number{
    let cart = this.getCart();
    let sum = 0;
    for(var i=0; i<cart.itens.length; i++){
      sum =+ cart.itens[i].produto.preco * cart.itens[i].quantidade;
    }
    return sum;
  }


}