import { Component, OnInit } from '@angular/core';
import {FormBuilder , FormControl , FormGroup , Validators} from '@angular/forms'
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import noWhitespaceValidator from 'src/app/Validators/whitespacevalidator';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  formGroup:FormGroup
  constructor(private formBuilder:FormBuilder,private appServices:CategoryService,private snackBar:MatSnackBar,private router:Router) { 
    
  }

  ngOnInit() {
    this.formGroup=this.formBuilder.group({
      name:new FormControl('',[Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z ]*$/),noWhitespaceValidator])]),
      email:new FormControl('',[Validators.compose([Validators.required,Validators.email,noWhitespaceValidator])]),
      mobile:new FormControl('',[Validators.compose([Validators.required])])
    })
    this.formGroup.controls["mobile"].disable();
    this.appServices.getCustProfile().subscribe((res:any)=>{
      this.formGroup.controls["name"].setValue(res.data.user_name)
      this.formGroup.controls["email"].setValue(res.data.user_email)
      this.formGroup.controls["mobile"].setValue(res.data.user_mobile)
    },err=>{
      this.snackBar.open(err,"Ok",{duration:20000})
    })
  }

  editProfile(){
    if(this.formGroup.valid){
      let params:any ={}
      params.name=this.formGroup.value.name;
      params.email=this.formGroup.value.email;
      this.appServices.updateCustProfile(params).subscribe((res:any)=>{
        this.snackBar.open("Profile SUccessFully added","Ok",{duration:10000})
      },err=>{
        this.snackBar.open(err,"Ok",{duration:20000})
      })
    }
  }
  get p(){return this.formGroup.controls;}

}
