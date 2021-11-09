import { Injectable } from '@angular/core';
import {  Subject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class CartService {

  cart = new Subject<any>();
  constructor(private snackbar:MatSnackBar) { }
  
  addToCart(item){
    var cart = localStorage.getItem("cart");
    if(cart){
      // already cart has some data
      var old_cart = JSON.parse(cart);
      if(old_cart.find(x=>x.id==item.id)){
        this.snackbar.open("item already exists","ok",{duration:10000})
        return false
      }
      old_cart.push(item);
      var updated_cart = JSON.stringify(old_cart);
      localStorage.setItem("cart",updated_cart);
      this.cart.next();
      this.snackbar.open("Added to the cart","ok",{duration:10000})
    }
    else{
      // cart is empty create it newly 
      var new_cart = [];
      new_cart.push(item);
      localStorage.setItem("cart",JSON.stringify(new_cart));
      this.cart.next();
    }
  }

  removeFromCart(item){
    var cart = localStorage.getItem("cart");
    if(cart){
      var old_cart = JSON.parse(cart);
      var updated_cart = old_cart.filter(x=>x.id!==item.id);
      localStorage.setItem("cart",JSON.stringify(updated_cart));
      this.cart.next();
    }else{
      return "Cart is empty";
    }
  }
  clearCart(){
    localStorage.removeItem("cart");
    this.cart.next();
  }
  getCart(){
    return this.cart as Observable<any>;
  }
}
