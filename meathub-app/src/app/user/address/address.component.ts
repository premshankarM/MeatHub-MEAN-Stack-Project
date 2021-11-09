import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addresses:any=[]
  constructor(private appServices:CategoryService,private snackbar:MatSnackBar) { }
  ngOnInit() {
    this.appServices.getAddresses().subscribe((res:any)=>{this.addresses=res.data},err=>{this.snackbar.open(err,"Ok",{duration:20000})
    })
  }
  deleteAddress(id){
    let params:any ={}
    params.adds_id=id
    this.appServices.deleteAddress(params).subscribe((res:any)=>{this.ngOnInit()},err=>{this.snackbar.open(err,"Ok",{duration:20000})})
  }

}
