import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable()
export class CategoryService {

  constructor(private http:HttpClient) { }
  
  register(params){
    return this.http.post(environment.endpoint+'register',params)
  }
  loginCust(params){
    return this.http.post(environment.endpoint+'login',params)
  }
  isLoggesIn(){
    if(localStorage.getItem("token")){
      return true
    }
    else{
      return false
    }
  }
  logOut(){
    localStorage.clear()
    window.location.reload();
  }

  getCustProfile(){
    return this.http.get(environment.endpoint+'profile')
  }
  updateCustProfile(params){
    return this.http.post(environment.endpoint+'profile/add',params)
  }
  addAddress(params){
    return this.http.post(environment.endpoint+'address/add',params)
  }
  getAddresses(){
    return this.http.get(environment.endpoint+'address')
  }
  getOneAddress(params){
    return this.http.post(environment.endpoint+'address/one',params)
  }
  editOneAddress(params){
    return this.http.post(environment.endpoint+'address/edit',params);
  }
  deleteAddress(params){
    return this.http.post(environment.endpoint+'address/delete',params)
  }
  getOrders(){
    return this.http.get(environment.endpoint+'categories')
  }
  getSubCats(params){
    return this.http.post(environment.endpoint+'subcats',params);
  }
  getOneSubCat(params){
    return this.http.post(environment.endpoint+'subcat/find',params)
  }
  createOrder(params){
    return this.http.post(environment.endpoint+'order/create',params)
  }
  processOrder(params){
    return this.http.post(environment.endpoint+'order/process',params)
  }
  getOrderHistory(){
    return this.http.post(environment.endpoint+'orders',{})
  }
}