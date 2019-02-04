export  interface User  
{
  firstname : String;
  lastname  : String;
  birthdate : String;
  gender    : String;
  hobby  : [string];
  phoneNo   : String;
  address   : String;
  city      : String;
  state     : String;
  zipcode   : String;  
  email     : String;
  password  : String;
  confirmPassword : String;
  username : String;
  ProfPic : String;
}
export interface Uservalue {
  [key : number] : User
}


