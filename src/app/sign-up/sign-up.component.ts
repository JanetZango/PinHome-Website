import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  fName;sName;orgName;email;mobile;tel;password;confirm
  constructor() { }

  ngOnInit() {
  }

  registerIncorporator(fName,sName,orgName,email,mobile,tel,password,confirm){
    console.log(fName);
    
  }

}
