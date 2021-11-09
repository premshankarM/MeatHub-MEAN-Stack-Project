import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cat-result-page',
  templateUrl: './cat-result-page.component.html',
  styleUrls: ['./cat-result-page.component.scss']
})
export class CatResultPageComponent implements OnInit {
  cat_id:any
  subcats:any
  cat_name:any
  constructor(private appServices:CategoryService,private route:ActivatedRoute,private snackbar:MatSnackBar ) { 

  }

  ngOnInit(){
    this.cat_id=this.route.snapshot.params.cat_id
    this.cat_name=this.route.snapshot.params.cat_name
    console.log(this.cat_id);
    let params:any ={}
    params.cat_id=this.cat_id
    this.appServices.getSubCats(params).subscribe((res:any)=>{this.subcats=res.data},err=>{this.snackbar.open(err,"Ok",{duration:10000});
    })
  }
}
