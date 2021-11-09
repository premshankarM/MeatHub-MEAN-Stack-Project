import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-order-now',
  templateUrl: './order-now.component.html',
  styleUrls: ['./order-now.component.scss']
})
export class OrderNowComponent implements OnInit {
  cats:any
  constructor(private appServices:CategoryService,private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.appServices.getOrders().subscribe((res:any)=>{
      this.cats=res.data
    },err=>{
      this.snackbar.open(err,"Ok",{duration:20000});
    })
  }

}
