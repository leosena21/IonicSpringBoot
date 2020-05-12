import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { Observable } from 'rxjs';
import { ClienteDTO } from 'src/app/models/cliente.dto';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService{

  constructor(public http: HttpClient, public storage: StorageService){
    
  }

  findByEmail(email: string) : Observable<ClienteDTO>{
    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

    return this.http.get<ClienteDTO>(
      `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
      {'headers': authHeader});
  }

  getImageFromBucket(id: string) : Observable<any>{
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    return this.http.get(url, {responseType: 'blob'});
  }
  
}