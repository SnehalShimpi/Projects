import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MustMatch } from '../validate';
import { UserService } from '../user.service';
import { User } from '../user';
import { State } from '../state';
import { ToastrService } from 'ngx-toastr';
import { devModeEqual } from '@angular/core/src/change_detection/change_detection';
import { variable } from '@angular/compiler/src/output/output_ast';
import {map} from 'rxjs/operators';
import { checkAndUpdateDirectiveDynamic } from '@angular/core/src/view/provider';
class imageSnippet{
 
  constructor(public src:string, public file : File ){}
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  
  hobby = [
    { id: 1, genre: 'acting' },
    { id: 2, genre: 'singing' },
    { id: 3, genre: 'dancing' },
    { id: 4, genre: 'cricket' },
  
  ];
  
  selectedFile :imageSnippet;
  userForm: FormGroup;
  user: User[];
  state: State[];
  public Image :any
  public Path : any


  constructor(private fb: FormBuilder, private userService: UserService, private t: ToastrService) {
  }
  
    // Simply add the list of FormControls to the FormGroup as a FormArray
   
  
   
  
  ngOnInit() {
    this.getState();
   
    //this.t.success('value', 'updated');
    const formControls = this.hobby.map(control => new FormControl(false));
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      hobby: new FormArray(formControls),
      phoneNo: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      address: [''],
      city: ['',Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6),Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{4,8}$')]],
      confirmPassword: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern('^[a-z]*$')]],
      ProfPic : ['',Validators.required],
    }, { validator: MustMatch('password', 'confirmPassword')}
    )
    this.userForm.patchValue({
      state :''
    })
    
  }

  
  onSubmit() {
  
  }

    ProcessFile(imageInput :any){
     this.Image = imageInput;  
     const file : File = this.Image.files[0];
     const reader = new FileReader();
       reader.addEventListener('load',(event : any)=>{
    
      this.selectedFile = new imageSnippet(event.target.result,file)
      this.userService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
        
         this.Path = res.status;
         if(res.status == true){
           this.t.success(res.message);
         }
         if(res.status == false){
           this.t.error(res.err)
         }
      
        },
        (err) => {
          console.log(err);
       
        })
       
    
    
     });
     reader.readAsDataURL(file);
    
  }
 list() {
    this.userService.getList().subscribe((data: any) => {
      this.user = data.docs;
      //console.log(data);
      
    })
  }

  

  add() { 
    //console.log(this.Path)
    const selectedPreferences = this.userForm.value.hobby.
   map((checked, index) => checked ? this.hobby[index].genre : '');
   console.log(selectedPreferences)
 

    this.userForm.controls['hobby'].patchValue(selectedPreferences);
  
      this.userService.add(this.userForm.value).subscribe((res : any) =>{
        console.log(this.userForm.value);
       
        console.log(res);
        if(res.status == 123){
          this.t.success("Succesfully register user");
        }
      if(res.status == 1){
        this.t.error('status', 'Email already in use');
      }
      if(res.status == 2){
        this.t.error('error','username in use')
      }
    },
      (err) => {
              console.log(err);
      })
     
     

      
   
  }

  getState() {
    this.userService.getState().subscribe((data: any) => {
      this.state = data.docs;
     
    })


  }
  cancel(){
    this.userForm.patchValue({
     
        firstname:'',
        lastname:'',
        birthdate:'',
        gender:'', 
        //hobby:'',
        phoneNo:'' ,
        address:'',
        city: '',
        state: '',
        zipcode:'',
        email:'',
        password:'' ,
        confirmPassword:'' ,
        username: '',
        ProfPic : '',
    })
  }
 
      
 
}
