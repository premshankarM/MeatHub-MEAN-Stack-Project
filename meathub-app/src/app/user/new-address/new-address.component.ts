import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import noWhitespaceValidator from 'src/app/Validators/whitespacevalidator';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit {
  formGroup:FormGroup
  adds_id:any
  constructor(private route:ActivatedRoute,private formBuilder:FormBuilder,private appServices:CategoryService,private snackBar:MatSnackBar,private router:Router){
   }

  ngOnInit() {

    this.adds_id=this.route.snapshot.params.adds_id;

    this.formGroup=this.formBuilder.group({
      addr_name:new FormControl('',[Validators.compose([Validators.required,noWhitespaceValidator])]),
      house_flat_no:new FormControl('',[Validators.compose([Validators.required,noWhitespaceValidator])]),
      area_locality:new FormControl('',[Validators.compose([Validators.required,noWhitespaceValidator])]),
      landmark:new FormControl('',[Validators.compose([Validators.required,noWhitespaceValidator])])
    })

    if(this.adds_id){
      let params:any={}
      params.adds_id=this.adds_id
      this.appServices.getOneAddress(params).subscribe((res:any)=>{
        this.formGroup.controls["addr_name"].setValue(res.data.address_name)
        this.formGroup.controls["house_flat_no"].setValue(res.data.house_no)
        this.formGroup.controls["area_locality"].setValue(res.data.area_locality)
        this.formGroup.controls["landmark"].setValue(res.data.landmark)
      },err=>{this.snackBar.open(err,"Ok",{duration:20000})})
    }
  }
  get p(){return this.formGroup.controls;}

  address(){
    if(this.formGroup.valid){
      let params:any ={}
      params.addr_name=this.formGroup.value.addr_name
      params.house_flat_no=this.formGroup.value.house_flat_no
      params.area_locality=this.formGroup.value.area_locality
      params.landmark=this.formGroup.value.landmark
      if(this.adds_id){
        this.editAddress(params)
      }
      else{
        this.addAddress(params)
      }
    }
  }
  addAddress(params){
    this.appServices.addAddress(params).subscribe((res:any)=>{
      this.router.navigate(["/user/address"])
    },err=>{
      this.snackBar.open(err,"Ok",{duration:20000})
    })
  }
  editAddress(params){
    params.adds_id=this.adds_id
    this.appServices.editOneAddress(params).subscribe((res:any)=>{
      this.router.navigate(["/user/address"])
    },err=>{
      this.snackBar.open(err,"Ok",{duration:20000})
    })
  }
}
