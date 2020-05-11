import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor{

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log("passou");
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

          return throwError(errorObj);
        })) as any;
  }
}



export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};