import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User[]
  constructor(private userService: UserService,
    private T: ToastrService,
    private router: Router) { }
  username : any;
  ngOnInit() {
    this.userInfo();

  }
  userInfo() {
    var token = this.userService.getToken();
    console.log("token is " + token);



    this.userService.UserInfo(token).subscribe((res: any) => {
      this.user = res.user;
      this.username = res.user.username
      console.log(this.user);
    });

  }
  login() {
    console.log("inside login");

    this.router.navigateByUrl('dashboard');
  }
  logOut() {
    this.userService.logout();

  }
  Delete() {


    

    
      console.log(this.username)
     
     this.userService.DeleteAccount(this.username).subscribe(res =>{console.log(res)})
      this.T.success("successfully deleted account");
      this.userService.logout();
      
      
  }


}
