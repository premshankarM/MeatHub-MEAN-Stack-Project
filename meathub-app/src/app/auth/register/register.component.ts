import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validator, Validators} from '@angular/forms'
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  formGroup:FormGroup;
  constructor(private formBuilder:FormBuilder,private router:Router,private appService:CategoryService,private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.formGroup=this.formBuilder.group({
      name:new FormControl('',[Validators.compose([Validators.required])]),
      mobile:new FormControl('',[Validators.compose([Validators.required,Validators.pattern(/^[0-9]*$/),Validators.minLength(10),Validators.maxLength(10)])]),
      email:new FormControl('',[Validators.compose([Validators.required,Validators.email])]),
      password:new FormControl('',[Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(15)])])
    })
  }

  get p(){return this.formGroup.controls;}

  register(){
    if(this.formGroup.valid){
      let params:any ={}
      params.name=this.formGroup.value.name,
      params.mobile=this.formGroup.value.mobile,
      params.email=this.formGroup.value.email
      params.password=this.formGroup.value.password
      this.appService.register(params).subscribe((res:any)=>{
        this.snackbar.open("Regrestration SucessFull,A verification mail has sent to your account","ok",{duration:5000})
        this.router.navigate(['\login'])
      },err=>{console.log(err)})
    }
  }

}
