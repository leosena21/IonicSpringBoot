import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { CidadeDTO } from 'src/app/models/cidade.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CidadeService{
  constructor(public http: HttpClient){
  }

  findAll(estado_id: string) : Observable<CidadeDTO[]>{
    return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`)
  }
}