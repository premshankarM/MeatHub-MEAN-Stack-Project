import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import noWhitespaceValidator from '../Validators/whitespacevalidator';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  formgroup:FormGroup
  constructor(private formBuilder:FormBuilder,private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.formgroup=this.formBuilder.group({
      name:new FormControl('',(Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z ]*$/),noWhitespaceValidator]))),
      email:new FormControl('',(Validators.compose([Validators.required,Validators.email,noWhitespaceValidator]))),
      subject:new FormControl('',(Validators.compose([Validators.required,noWhitespaceValidator]))),
      message:new FormControl('',(Validators.compose([Validators.required,noWhitespaceValidator]))),
    })
  }
  contactUs(){
    if(this.formgroup.valid){
    let params:any={}
    params.name=this.formgroup.value.name
    params.email=this.formgroup.value.email
    params.subject=this.formgroup.value.subject
    params.message=this.formgroup.value.message
    this.snackbar.open("message Sent","Ok",{duration:10000})
    }
    else{
      this.snackbar.open("Please fill all the fields","Ok",{duration:10000})
    }
  }
  get p(){return this.formgroup.controls;}


}
