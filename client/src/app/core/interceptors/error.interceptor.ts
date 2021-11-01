import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(

      catchError(error=>{

        if(error){
          if(error.status===404){
           // this.router.navigateByUrl('/not-found');
           this.toastr.error(error.error.message,error.error.statusCode);
           

          }
          if(error.status===400){
            // this.router.navigateByUrl('/not-found');

            if(error.error.errors){
              throw error.error;
            }else{
            this.toastr.error(error.error.message,error.error.statusCode);
            }
            
 
           }
          if(error.status===500){

            const navigationExtras:NavigationExtras={state:{error:error.error}};

            this.router.navigateByUrl('/server-error',navigationExtras);
           // this.toastr.error(error.error.message,error.error.statusCode);
          }
        }
        return throwError(error);
      })
    );
  }
}
