import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { AlertController } from '@ionic/angular';
import { FieldMessage } from '../models/fieldmessage';

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
            
            case 422:
              this.handle422(errorObj);
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

  async handle422(errorObj){

    console.log("OK");

    const alert =  await this.alertCtrl.create({
      subHeader: 'Erro 422: Validação',
      message: this.listErrors(errorObj.errors),
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

  private listErrors(messages : FieldMessage[]) : string {
    let s : string = '';
    for (var i=0; i<messages.length; i++) {
        s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
    }
    return s;
}

}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};