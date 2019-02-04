import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import{UserService} from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      if(this.auth.isLoggedIn()){
        return true;
      }
      else{
        this.Router.navigate(["home/login"]);
        return false;
      }
  
    
  }
  constructor(private T : ToastrService , private auth : UserService,private Router : Router  ){

  }
}
