import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as moment from 'moment';
import noWhitespaceValidator from 'src/app/Validators/whitespacevalidator';

declare var Razorpay:any;
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cart:any=[];
  totalAmount:any
  delivaryCharges:any = 50
  internetServiceCharges:any = 0
  gst:any =0
  amount:any
  addresses:any
  dates=[];
  formGroup:FormGroup
  order_data:any={}
  cart_data:any={}
  current_time:any;
  timeslots:any;
  deliveryForm:FormGroup;
  
  constructor(private router:Router,private cartServices:CartService,private snackbar:MatSnackBar,private categorySevices:CategoryService,private formBuilder:FormBuilder) { }

  ngOnInit() {
    // form related stuff
    this.categorySevices.getAddresses().subscribe((res:any)=>{this.addresses=res.data},
    err=>{this.snackbar.open(err,"Ok",{duration:20000})})
    this.deliveryForm = this.formBuilder.group({
      date:new FormControl('',[Validators.compose([Validators.required])]),
      time:new FormControl('',[Validators.compose([Validators.required])]),
    })
    this.formGroup=this.formBuilder.group({
      name:new FormControl('',[Validators.compose([Validators.required,noWhitespaceValidator,Validators.pattern(/^[a-zA-Z ]*$/)])]),
      email:new FormControl('',[Validators.compose([Validators.required,noWhitespaceValidator,Validators.email])]),
      mobile:new FormControl('',[]),
      mobile_alt:new FormControl('',[Validators.compose([Validators.required,noWhitespaceValidator,Validators.pattern(/^[0-9]*$/)])]),
      address:new FormControl('',[Validators.compose([Validators.required])])
    })
    this.formGroup.controls["mobile"].setValue(localStorage.getItem("User_mobile"));
    this.formGroup.controls["mobile"].disable();
    this.cart=JSON.parse(localStorage.getItem("cart"))
    this.totalAmount=0;
    this.cart.forEach(value => {

      this.totalAmount+=(value.rate_per_kg*value.weight)
    });
    this.internetServiceCharges=(3*(this.totalAmount+this.delivaryCharges))/100
    this.amount=this.totalAmount+this.internetServiceCharges+this.delivaryCharges+this.gst

    if(new Date().getHours()<18){
      this.dates.push(moment().format("DD-MMM-YYYY"))
      }
      for(let i=1;i<=6;i=i+1){
        this.dates.push(moment().add(i,"days").format("DD-MMM-YYYY"))
      }
  }
  deleteCart(item){
    
    this.cartServices.removeFromCart(item);
    this.ngOnInit()
  }
  routeToAddress(){
    if(this.formGroup.controls["address"].value=="add"){
        this.router.navigate(['/address/add'])
      }
  }

  createOrder(){
    if(this.formGroup.valid && this.deliveryForm.valid){
      this.order_data.name=this.formGroup.value.name
      this.order_data.email=this.formGroup.value.email
      this.order_data.mobile=localStorage.getItem("User_mobile")
      this.order_data.mobile_alt=this.formGroup.value.mobile_alt
      this.order_data.address=this.formGroup.value.address
      this.order_data.date=this.deliveryForm.value.date
      this.order_data.time=this.deliveryForm.value.time
      this.cart_data=localStorage.getItem("cart")
      let orderParams:any ={}
      orderParams.amount=this.amount
      orderParams.order_data=JSON.stringify(this.order_data)
      orderParams.cart=this.cart_data
      orderParams.email=this.formGroup.value.email
      
      this.categorySevices.createOrder(orderParams).subscribe((res:any)=>{
        let order = res.data;
        order.name = this.order_data.name;
        order.email = this.order_data.email;
        order.mobile = localStorage.getItem("User_mobile");
        order.amount = this.amount;
        this.processPayment(order);
      },err=>{
        this.snackbar.open(err,"Ok",{duration:20000})
      });
    }
    else{
      this.snackbar.open("please Fill all the Fields","Ok",{duration:20000})
    }

  }
  get p(){return this.formGroup.controls;}
  processPayment(orderData){
    var me =this;
    var options = {
      "key": environment.api_key, 
      "amount": orderData.amount*100, 
      "currency": "INR",
      "name": orderData.name,
      "description": "Order",
      "image": "",
      "order_id": orderData.order_id,
      "handler": function (response){
          me.handleResponse(response,orderData)
      },
      "prefill": {
          "name": orderData.name,
          "email": orderData.email,
          "contact": orderData.mobile
      },
      "notes": {
          "order_uid":orderData.order_unique_id
      },
      "theme": {
          "color": "#F37254"
      }
  };

  var rzp1 = new Razorpay(options);
  rzp1.open();

  }

  handleResponse(pg_response,orderData){
    let params: any ={};
    params.p_id=pg_response.razorpay_payment_id
    params.order_unique_id=orderData.order_unique_id
    this.categorySevices.processOrder(params).subscribe((res:any)=>{
        this.cartServices.clearCart();
        this.router.navigate(['/user/order/history']);
    },err=>{
      this.snackbar.open(err,"Ok",{duration:10000});
      
    });
  }
  timeSlot(){
    this.current_time=new Date().getHours()
    let a= this.deliveryForm.value.date;
    let b=moment().add("days").format("DD-MMM-YYYY");
  
    
    if(a===b){
      if(this.current_time<7){
        this.timeslots=["7 AM - 10 Am","10 AM - 1 PM","1 PM - 4 PM","4 PM - 8 PM"]
      }
      else if(this.current_time>=7 && this.current_time<10){
        this.timeslots=["10 AM - 1 PM","1 PM - 4 PM","4 PM - 8 PM"]
      }
      else if(this.current_time>=10 && this.current_time<13){
        this.timeslots=["1 PM - 4 PM","4 PM - 8 PM"]
      }
      else if(this.current_time>=13 && this.current_time<16){
        this.timeslots=["4 PM - 8 PM"]
      }
    }
    else{
      this.timeslots=["7 AM - 10 Am","10 AM - 1 PM","1 PM - 4 PM","4 PM - 8 PM"]
    }
  }
}
