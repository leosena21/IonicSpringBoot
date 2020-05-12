import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor{

  constructor(public storage: StorageService, public alertCtrl: AlertController){

  }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req)
    .pipe(
        catchError(error => {

          let errorObj = error;

          if(errorObj.error){
            errorObj = errorObj.error
          }

          if( !errorObj.status ){
            error = JSON.parse(errorObj);
          }

          console.log("Erro detectado pelo interceptor");
          console.log(errorObj);

          switch(errorObj.status){

            case 401:
              this.handle401();
              break;

            case 403:
              this.handle403();
              break;

            default:
              this.handleDefaultError(errorObj);
          }

          return throwError(errorObj);
        })) as any;
  }

  async handleDefaultError(errorObj){
    const alert =  await this.alertCtrl.create({
      subHeader: 'Erro ' + errorObj.status +': ' + errorObj.error,
      message: errorObj.message,
      buttons:[
        {
          text: 'Ok'
        }
      ]
    });
    await alert.present();
  }

  async handle401(){
    const alert =  await this.alertCtrl.create({
      subHeader: 'Erro 401: falha de autenticação',
      message: 'Email ou senha incorreta',
      buttons:[
        {
          text: 'Ok'
        }
      ]
    });
    await alert.present();
  }

  handle403(){
    this.storage.setLocalUser(null);
  }

}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};