import { Injectable } from '@angular/core';
import { Observable, of, observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from './user';
import { ToastrService } from 'ngx-toastr';
import{Router} from '@angular/router'



@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private LoggedInStatus = false;

  url = "http://localhost:8080/myapi/users/";
  url1 = "http://localhost:8080/myapi/user/";
  stateUrl = "http://localhost:8080/myapi/states/";
  loginUrl ="http://localhost:8080/myapi/login/";
  forgotPassword = "http://localhost:8080/myapi/mail/";
  resetPassword = "http://localhost:8080/myapi/password/";
  profPicture = "http://localhost:8080/myapi/upload";
  getInfo = "http://localhost:8080/secure/userInfo";
  
 // validate = "http://localhost:8080/myapi/users/validate/";
  constructor(private http: HttpClient , private t : ToastrService , private Router : Router) { }

  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }

  
  

  getToken() {
    return localStorage.getItem("LoggedInUser")
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem("LoggedInUser");
  
    this.Router.navigate(["/home/login"]);
  }
  
  add(data) {
    console.log(name);
    return this.http.post<any>(this.url1, data);
   
  }

  getList() {
    return this.http.get(`${this.url}`);
  }

  getState()
  {
    return this.http.get(`${this.stateUrl}`);
  }

 login(data)
 {
   return this.http.post<any>(`${this.loginUrl}`,data);
 }

 forgotPass(data){
   return this.http.post<any>(`${this.forgotPassword}`, data);
 }

 ResetPass(email , pass){
   return this.http.put<any>(`${this.resetPassword}`, {"email" : email , "password" : pass });
 }

 ProfPic(ProfPic, value){
   return this.http.post<any>(`${this.profPicture}`, {"KEY" : ProfPic, "VALUE" : value})
 }
 public uploadImage(image:File){
  const formData = new FormData();
  formData.append('photo',image);
  return this.http.post<any>('http://localhost:8080/myapi/upload',formData)
}

UserInfo(token){
  return this.http.post<any>(`${this.getInfo}`,{ "token" : token})
}




}

