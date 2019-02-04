import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import{UserService} from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user';
import{Router,RouterModule} from '@angular/router';   
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  passForm: FormGroup;
  user : User[];
  constructor(private fb : FormBuilder,private userService : UserService,
    private T : ToastrService,
    private router : Router) { }

  ngOnInit() {
    this.passForm = this.fb.group({
      email : ['', [Validators.required,Validators.email]],
     
  })
 }
 ForgotPassword(){
  this.userService.forgotPass(this.passForm.value).subscribe((res : any) => {
   console.log("mail send");
   console.log(res);
   console.log(res.status);
   //console.log(res.docs);
   if(res.status == false)
   {
    this.T.error('Mail not send', "Please give valid email");
   }
   else
   { this.T.success("Send link on Email");
   }
  
   
   
  });

}
cancel(){
  this.passForm.setValue({
    email : ''
  })
}
}
