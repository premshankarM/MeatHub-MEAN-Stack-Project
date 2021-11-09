import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service'

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
    catservices:any;
    constructor(private injector:Injector) { 
        this.catservices = this.injector.get(CategoryService)
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.catservices.isLoggesIn()){
            var token = localStorage.getItem("token");
            request = request.clone({
                setHeaders:{
                    Authorization:`Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}