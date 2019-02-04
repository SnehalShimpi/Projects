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
  if (this.loginForm.valid) {
    this.userService.sendToken(res.token)
  
   
  }

if(res.status == true){

  this.T.success('status', "Login Succesfully Done");
  this.router.navigate(["dashboard"]);
 
}else{
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
