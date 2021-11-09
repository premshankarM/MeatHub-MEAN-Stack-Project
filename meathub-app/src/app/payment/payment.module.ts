import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard'
import { MatRippleModule, MatSnackBarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CartPageComponent } from './cart-page/cart-page.component';
import {MatStepperModule} from '@angular/material/stepper';


const routes:Routes = [
  {path:'cart/add',component:AddToCartComponent,canActivate:[AuthGuard]},
  {path:'checkout',component:CheckOutComponent,canActivate:[AuthGuard]},
  {path:'cart',component:CartPageComponent,canActivate:[AuthGuard]},
  {path:'cart/add/:subcat_id',component:AddToCartComponent,canActivate:[AuthGuard]}
]
@NgModule({
  declarations: [AddToCartComponent, CheckOutComponent, CartPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatRippleModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatStepperModule
  ]
})
export class PaymentModule { }
