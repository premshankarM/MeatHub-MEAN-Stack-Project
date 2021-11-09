import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from './services/category.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private catServices:CategoryService,private router:Router) {
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.catServices.isLoggesIn());
    if(this.catServices.isLoggesIn()){

      return true;
    }
    else{
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
