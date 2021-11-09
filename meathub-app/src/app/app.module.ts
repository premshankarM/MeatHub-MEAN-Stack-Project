import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OrderNowComponent } from './order-now/order-now.component';
import { CatResultPageComponent } from './cat-result-page/cat-result-page.component';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { CategoryService } from './services/category.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatCardModule, MatButton, MatButtonModule, MatProgressBarModule} from '@angular/material'
import { HttpAuthInterceptor } from './interceptors/http.interceptor'
import { CartService } from './services/cart.service';
import { CarousalComponent } from './carousal/carousal.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoadingInterceptor } from './interceptors/loader.interceptor';
import { LoaderService } from './services/loader.service';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations:[
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    OrderNowComponent,
    CatResultPageComponent,
    CarousalComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    UserModule,
    CarouselModule,
    PaymentModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatGoogleMapsAutocompleteModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAk9YYZolWFOhEAeKDY-AKCA28CuwQHxJg',
      libraries: ['places']
    })
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS,useClass:HttpAuthInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    CategoryService,CartService,LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
