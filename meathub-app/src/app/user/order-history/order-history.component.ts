import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders:any
  panelOpenState = false;
  orderLength:any=true
  constructor(private categoryServices:CategoryService,private snackbar:MatSnackBar) { }

  ngOnInit() {
      this.categoryServices.getOrderHistory().subscribe((res:any)=>{
        this.orders=res.data;
        if(this.orders.length>0){
          this.orderLength=false
          this.orders.forEach(element => {
            element.order_data = JSON.parse(element.order_data);
            element.delivery_address = JSON.parse(element.delivery_address)
          });
        }
      },err=>{this.snackbar.open(err,"Ok",{duration:20000})
    })
  }

}
