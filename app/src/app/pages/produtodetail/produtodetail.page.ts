import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/app/models/produto.dto';

@Component({
  selector: 'app-produtodetail',
  templateUrl: './produtodetail.page.html',
  styleUrls: ['./produtodetail.page.scss'],
})
export class ProdutodetailPage implements OnInit {

  item: ProdutoDTO

  constructor() { }

  ngOnInit() {
    this.item ={
      id: "1",
      nome: "Mouse",
      preco: 80.59
    }
  }

}
