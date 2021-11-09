import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isLoggedIn:boolean = false;
  cart_count = 0;
  cartObservable:Observable<any>;
  constructor(private categoryServices:CategoryService,private cartService:CartService) { }

  ngOnInit() {
    if(this.categoryServices.isLoggesIn()){
      this.updateCount();
      this.cartObservable = this.cartService.getCart();
      this.cartObservable.subscribe(()=>{
         this.updateCount();
      },err=>{
        console.log(err);
        
      });
      this.isLoggedIn=true
    }
  }

  ngOnDestroy(){
    
  }

  logout(){
    this.categoryServices.logOut()
  }

  updateCount(){
    var cart = localStorage.getItem("cart");
    if(cart){
      cart = JSON.parse(cart);
      this.cart_count = cart.length;
    } 
  }

}
