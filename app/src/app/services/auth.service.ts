import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { API_CONFIG } from '../config/api.config';
import { LocalUser } from '../models/local_user';
import { StorageService } from './storage.service';
import { JwtHelperService  } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root',
})
export class AuthService{

  jwtHelperService: JwtHelperService  = new JwtHelperService ();

  constructor(public http: HttpClient,  public storage: StorageService){
    
  }

  authenticate(creds : CredenciaisDTO){

    return this.http.post(
      `${API_CONFIG.baseUrl}/login`, 
      creds,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  refreshToken(){

    return this.http.post(
      `${API_CONFIG.baseUrl}/refresh_token`, 
      {},
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  sucessfullLogin(authorizationValue : string){
    let tok = authorizationValue.substring(7);
    let user : LocalUser = {
      token: tok,
      email: this.jwtHelperService.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);
  }

  logout(){
    this.storage.setLocalUser(null);
  }
}  