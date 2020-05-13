import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { ProdutoDTO } from 'src/app/models/produto.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService{
  constructor(public http: HttpClient){
  }

  findByCategoria(categoria_id: string) : Observable<ProdutoDTO[]>{
    return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`)
  }

  getSmallImageFromBucket(id: string) : Observable<any>{
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
    return this.http.get(url, {responseType: 'blob'});
  }
}