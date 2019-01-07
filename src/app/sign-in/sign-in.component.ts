import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';

import {Router} from'@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  results;  
  userId;
  constructor(private authen : AngularFireAuth, private db: AngularFireDatabase, public router: Router) { }

  ngOnInit() {
  }


  login(email,password){
      this.results = this.authen.auth.signInWithEmailAndPassword(email,password).then(()=>{
         this.results = this.authen.authState.subscribe(data =>{
          this.userId =  data.uid;
          // accpt(data)
          alert('You have successfully logged in')
          console.log(data);
           this.router.navigate(['/adding-data'])
           })
          }, Error =>{
            alert(Error.message)
          })
  }


    forgotpassword(email: string){
    return new  Promise<void>((resolve, reject)=>{
      this.authen.auth.sendPasswordResetEmail(email).then(()=>{
     alert("Check your email")
      }, Error =>{
        alert("Opp something went wrong.")
      });
    })
  }

  forgotpassword(email: string){
    return new  Promise<void>((resolve, reject)=>{
      this.authen.auth.sendPasswordResetEmail(email).then(()=>{
     alert("Check your email")
      }, Error =>{
        alert("Something went wrong.")
      });
    
    })
    
   
    
   
  }


}
