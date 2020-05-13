import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { EstadoDTO } from 'src/app/models/estado.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstadoService{
  constructor(public http: HttpClient){
  }

  findAll() : Observable<EstadoDTO[]>{
    return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`)
  }
}