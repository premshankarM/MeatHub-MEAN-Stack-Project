import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  catId:any;
  subcat:any;
  formGroup:FormGroup;
  // dates=[];
  // current_time:any;
  // timeslots:any
  constructor(private snackbar:MatSnackBar,private appServices:CategoryService,private router:Location,private route:ActivatedRoute,private formBuilder:FormBuilder,private cartService:CartService){}

  ngOnInit() {
    this.catId=this.route.snapshot.params.subcat_id
    let params:any ={}
    params.catId=this.catId
    this.appServices.getOneSubCat(params).subscribe((res:any)=>{this.subcat=res.data},err=>{this.snackbar.open(err,"ok",{duration:10000});})
    this.formGroup=this.formBuilder.group({
      // date:new FormControl('',[Validators.compose([Validators.required])]),
      weight:new FormControl('',[Validators.compose([Validators.required])]),
      cut:new FormControl('',[Validators.compose([Validators.required])]),
      // time:new FormControl('',[Validators.compose([Validators.required])])
    })
    // if(new Date().getHours()<18){
    // this.dates.push(moment().format("DD-MMM-YYYY"))
    // }
    // for(let i=1;i<=6;i=i+1){
    //   this.dates.push(moment().add(i,"days").format("DD-MMM-YYYY"))
    // }
    
}
  // timeSlot(){
  //   this.current_time=new Date().getHours()
  //   let a= this.formGroup.value.date;
  //   let b=moment().add("days").format("DD-MMM-YYYY");
  //   if(a===b){
  //     if(this.current_time<7){
  //       this.timeslots=["7 AM - 10 Am","10 AM - 1 PM","1 PM - 4 PM","4 PM - 8 PM"]
  //     }
  //     else if(this.current_time>7 && this.current_time<10){
  //       this.timeslots=["10 AM - 1 PM","1 PM - 4 PM","4 PM - 8 PM"]
  //     }
  //     else if(this.current_time>10 && this.current_time<13){
  //       this.timeslots=["1 PM - 4 PM","4 PM - 8 PM"]
  //     }
  //     else if(this.current_time>13 && this.current_time<16){
  //       this.timeslots=["4 PM - 8 PM"]
  //     }
  //   }
  //   else{
  //     this.timeslots=["7 AM - 10 Am","10 AM - 1 PM","1 PM - 4 PM","4 PM - 8 PM"]
  //   }
  // }
  addToCart(){
    if(this.formGroup.valid){
      let item:any={}
      item.id=this.subcat.id
      item.name=this.subcat.sub_cat_name
      item.rate_per_kg=this.subcat.rate_per_kg
      // item.date=this.formGroup.value.date
      item.weight=this.formGroup.value.weight
      item.cut=this.formGroup.value.cut
      // item.time=this.formGroup.value.time
      this.cartService.addToCart(item)
    }else{
      this.snackbar.open("Please Fill All the Forms","Ok",{duration:20000});
    }
  }
  back(){
    this.router.back();
  }
}
