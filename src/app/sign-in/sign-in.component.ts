import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  results;  
  userId;
  constructor(private authen : AngularFireAuth, private db: AngularFireDatabase) { }

  ngOnInit() {
  }


  login(email,password){
    return new Promise ((accpt, rej)=>{
      this.results = this.authen.auth.signInWithEmailAndPassword(email,password).then(()=>{
         this.results = this.authen.authState.subscribe(data =>{
          this.userId =  data.uid;
          // accpt(data)
          alert('u have logged in')
          console.log(data);
      
          })}, 
          error => 
          {
           rej(error.message)
          })
    })
  }

  // forgotpassword(email: string) {
  //   return this.afAuth.auth.sendPasswordResetEmail(email)
  //     .then(() => console.log('sent Password Reset Email!'))
  //     .catch((error) => console.log(error))
  // }
  
}
