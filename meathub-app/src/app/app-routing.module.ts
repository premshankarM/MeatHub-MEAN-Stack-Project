import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OrderNowComponent } from './order-now/order-now.component';
import { CatResultPageComponent } from './cat-result-page/cat-result-page.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth.guard'
import { CarousalComponent } from './carousal/carousal.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'about',component:AboutUsComponent},
  {path:'contact',component:ContactUsComponent},
  {path:'categories',component:OrderNowComponent},
  {path:'catresult',component:CatResultPageComponent},
  {path:'carousal',component:CarousalComponent},
  {path:'catresult/:cat_id/:cat_name',component:CatResultPageComponent},
  {path:'auth',loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)},
  {path:'user',loadChildren:() => import('./user/user.module').then(m => m.UserModule)},
  {path:'payment',loadChildren:() => import('./payment/payment.module').then(m => m.PaymentModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
