import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import{Routes,RouterModule} from '@angular/router'; 
import{UserService} from './user.service';
import{HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {NgxMaskModule} from 'ngx-mask'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import{AuthGuard} from './auth.guard';
import { HomeComponent } from './home/home.component';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';


 
 const   appRoutes : Routes = [
  {path:'home/register',component:RegisterComponent},
  {path:'home/login',component:LoginComponent },
  {path:'dashboard',component:DashboardComponent,canActivate : [AuthGuard]},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path:'resetPassword/:email',component:ResetPasswordComponent},
  {path:'home',component:HomeComponent},
  
  { path: '',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate : [AuthGuard]
    //redirectTo: 'home/login'
  },
  {path: '**',component:InvalidPageComponent}

  
];
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    InvalidPageComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [UserService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
