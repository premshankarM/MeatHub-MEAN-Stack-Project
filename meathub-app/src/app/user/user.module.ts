import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { NewAddressComponent } from './new-address/new-address.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { AddToCartComponent } from '../payment/add-to-cart/add-to-cart.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import { MatGoogleMapsAutocompleteModule, MatGoogleMapsAutocompleteComponent } from '@angular-material-extensions/google-maps-autocomplete';


const routes:Routes=[
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'address',component:AddressComponent,canActivate:[AuthGuard]},
  {path:'address/add',component:NewAddressComponent,canActivate:[AuthGuard]},
  {path:'order/history',component:OrderHistoryComponent,canActivate:[AuthGuard]},
  {path:'address/add/:adds_id',component:NewAddressComponent,canActivate:[AuthGuard]},
]

@NgModule({
  declarations: [ProfileComponent, AddressComponent, NewAddressComponent, OrderHistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDividerModule,
    MatGoogleMapsAutocompleteModule
  ]
})
export class UserModule { }
