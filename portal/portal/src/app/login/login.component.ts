import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import{UserService} from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user';
import{Router,RouterModule} from '@angular/router'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user : User[];
  constructor(private fb : FormBuilder,private userService : UserService,
    private T : ToastrService,
    private router : Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required],
    
  });
  if(this.userService.isLoggedIn()){
    this.router.navigateByUrl('dashboard');
  }
  
  
}
login(){
  console.log(this.loginForm.value)
this.userService.login(this.loginForm.value).subscribe((res : any) => {
  

if(res.status == true){
  this.userService.sendToken(res.token)
  this.T.success('status', "Login Succesfully Done");
  this.router.navigate(["dashboard"]);
 
}

if(res.status == false){
  console.log(res)
  console.log("not done");
  this.T.error('status', "Login failed");
  
}
});
}
cancel(){
  this.loginForm.setValue({
    username : '',
    password : ''
  })
}
}
