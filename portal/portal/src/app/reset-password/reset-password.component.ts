import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import{UserService} from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  ResetForm: FormGroup;
  user : User[];
  public email : string;
  public pass : string;
  constructor(private fb : FormBuilder , private userService : UserService 
    , private T : ToastrService,
    private route: Router,
    private Route: ActivatedRoute
    ) {

   }

  ngOnInit() {
   
    this.ResetForm = this.fb.group({
      //email : ['', [Validators.required,Validators.email]],
      password : ['',Validators.required]
  }),
  this.Route.params.subscribe(params => {
    this.email= params['email'];
    console.log(this.email);
  })
  
 

}
ResetPassword(){
  this.pass = this.ResetForm.get('password').value;
  this.userService.ResetPass(this.email,this.pass).subscribe((res : any) => {
   
    console.log(res);
    console.log(res.status);
    //console.log(res.docs);
    if(res.status == false)
    {
     this.T.error('Password not updated', "Please give valid email");
    }
    else
    { this.T.success("Password updated");
    }
   
    
    
   });
 

}
cancel(){
  this.ResetForm.setValue({
    password : ''
  })
}

}
