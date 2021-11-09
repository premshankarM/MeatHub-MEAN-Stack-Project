import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CategoryService } from '../services/category.service';
import { MatSnackBar } from '@angular/material';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    authService:any;
    constructor(private injector:Injector,private snakbar:MatSnackBar) { 
        this.authService = this.injector.get(CategoryService)
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {

                /* ------------------- Logging out user if api returns 401 ------------------ */
                this.snakbar.open("Session Expired","ok",{duration:3000});
                this.authService.logOut();
                // location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}