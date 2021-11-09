import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroupName,Validators, FormGroup} from '@angular/forms' 
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup:FormGroup
  constructor(private formBuilder:FormBuilder,private router:Router,private appServices:CategoryService,private snackBar:MatSnackBar) { }

  ngOnInit() {
    if(this.appServices.isLoggesIn()){
      this.router.navigate(['/categories'])
    }
    this.formGroup=this.formBuilder.group({
      mobile:new FormControl('',[Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^[0-9]*$/)])]),
      password:new FormControl('',[Validators.compose([Validators.required])]),
      checkbox:new FormControl('',[Validators.compose([Validators.required])])
    })
  }
  login(){
    if(this.formGroup.valid){
      let params:any ={}
      params.mobile=this.formGroup.value.mobile
      params.password=this.formGroup.value.password
      this.appServices.loginCust(params).subscribe((res:any)=>{
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("User_mobile",res.data.user_mobile)
        window.location.reload();
      },err=>{
        this.snackBar.open(err,"ok",{duration:10000})
      })
    }
    else{
      this.snackBar.open("please fill all the fields","ok",{duration:10000})
    }
  }
  get p(){return this.formGroup.controls;}

}
