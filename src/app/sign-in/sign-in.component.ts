import { Component, OnInit, NgZone } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';

import {Router} from'@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  results;  
  userId;
  message;

  constructor(private authen : AngularFireAuth, private db: AngularFireDatabase, public router: Router, private _ngZone: NgZone) { }

  ngOnInit() {
        this.authen.auth.signOut();
       
  }

  goToSignUp(){
    this.router.navigate(['/sign-up'])
  }


login(email,password,  doneCallback: () => void){
  this._ngZone.run(() =>{
    let myAlert = document.getElementsByClassName("customAlert0") as HTMLCollectionOf <HTMLElement>;
    let theOK = document.getElementById("theOkay" );
    let leader = document.getElementsByClassName("loading") as HTMLCollectionOf <HTMLElement>
    let b = window.innerHeight;

    myAlert[0].style.top = (b / 3.5) + "px";
    myAlert[0].style.left = "50%";
    myAlert[0].style.transform = "translateX(-54%)"
    if(email == "" || email == null){
      this.message = "Please insert your email";
      theOK.style.display = "block";
      leader[0].style.display = "none";
    }
    else if(password == "" || password == null){
      this.message = "Please insert your password";
      theOK.style.display = "block";
      leader[0].style.display = "none";
    }
    else{
 
        this.message = "Loading...";
        theOK.style.display = "none";
        leader[0].style.display = "block"

        this.results = this.authen.auth.signInWithEmailAndPassword(email,password).then(()=>{
         this.results = this.authen.authState.subscribe(data =>{
          this.userId =  data.uid;
          myAlert[0].style.top = (b/3.5) + "px";
          myAlert[0].style.left = "2.3%"; 
          
           this.router.navigate(['/adding-data'])
           })
          }, Error =>{

            this.message = Error.message
            theOK.style.display = "block";
            leader[0].style.display = "none";
          })
    }
  });
  }
  
  dismissAlert() {
    let alerter = document.getElementsByClassName('customAlert0') as HTMLCollectionOf<HTMLElement>;
    alerter[0].style.left = "-100%";
    this.message = "" 
  }



forgotpassword(email){
  this._ngZone.run(() =>{
    let myAlert = document.getElementsByClassName("customAlert0") as HTMLCollectionOf <HTMLElement>;
    let leader = document.getElementsByClassName("loading") as HTMLCollectionOf <HTMLElement>
    let theOK = document.getElementById("theOkay" );

    myAlert[0].style.left = "25%";
    theOK.style.display = "none";
    leader[0].style.display = "block";
    this.message = "Loading"
    if (email ==  undefined || email == ""){
      this.message = "Please enter your email address to reset your password"
    myAlert[0].style.left = "25%";
    theOK.style.display = "block";
    leader[0].style.display = "none";
    }
    else {
    return new  Promise<void>((resolve, reject)=>{
      this.authen.auth.sendPasswordResetEmail(email).then(()=>{
        myAlert[0].style.left = "25%"
        this.message = "We have sent you a link to reset your password, check your email."
        theOK.style.display = "block";
        leader[0].style.display = "none";
      }, Error =>{
        myAlert[0].style.left = "25%"
        this.message = Error.message
        theOK.style.display = "block";
        leader[0].style.display = "none";
        this.message = Error.message;
      });
    })
  }
})
  }


}
