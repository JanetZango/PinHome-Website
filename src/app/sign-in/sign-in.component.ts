import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

declare var google;
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { log } from 'util';


import swal from 'sweetalert';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
declare var firebase;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  results;
  userId;
  alertMessage;
  email;
  password;

  constructor(public router: Router, private _ngZone: NgZone) { }

  ngOnInit() {

  }

  goToSignUp() {
    this.router.navigate(['/sign-up'])
  }

  login(email, password) {
    // alert('clicked')
    console.log(email)
    this.alertMessage = "Verifying details..."
    // let myAlert = document.getElementsByClassName("overlayer") as HTMLCollectionOf<HTMLElement>;
    // let theLoader = document.getElementsByClassName("loader") as HTMLCollectionOf<HTMLElement>;
    // let dismisser = document.getElementsByClassName("dismissBtn") as HTMLCollectionOf<HTMLElement>;

    // myAlert[0].style.display = "block";
    // theLoader[0].style.display = "block"
    // dismisser[0].style.display = "none"
    // let b = window.innerHeight;

    // myAlert[0].style.top = (b / 3.5) + "px";
    // myAlert[0].style.left = "50%";
    // myAlert[0].style.transform = "translateX(-54%)"
    if (email == "" || email == undefined && password == "" || password == undefined) {
      this.alertMessage = "Please insert your email address and password to sign in.";
      // myAlert[0].style.display = "block";
      // theLoader[0].style.display = "none";
      // dismisser[0].style.display = "block"

      swal(this.alertMessage)
    } else
      if (email == "" || email == undefined) {
        this.alertMessage = "Please insert your email address";
        // myAlert[0].style.display = "block";
        // theLoader[0].style.display = "none"
        // dismisser[0].style.display = "block"
        // alert('no email')
        swal(this.alertMessage)
      }
      else if (password == "" || password == undefined) {
        this.alertMessage = "Please insert your password";
        // myAlert[0].style.display = "block";
        // theLoader[0].style.display = "none"
        // dismisser[0].style.display = "block"
        // alert('no pass')
        swal(this.alertMessage)
      }
      else {

        this.alertMessage = "Signing in...";
        // theOK.style.display = "none";
        // leader[0].style.display = "block"

        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
          firebase.auth().onAuthStateChanged(data => {
            this.userId = data.uid;
            // myAlert[0].style.top = (b/3.5) + "px";
            // myAlert[0].style.left = "2.3%"; 
            // alert("logged in")
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            
            Toast.fire({
              type: 'success',
              title: 'Signed in successfully'
            })
            this.router.navigate(['/landing-page'])
          }, Error => {
            // alert("something's wrong")
            alert(Error.message);
            // console.log(Error.message);
            // myAlert[0].style.display = "block";
            // theLoader[0].style.display = "none";
            // dismisser[0].style.display = "block"
            if (Error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
              this.alertMessage = "We do not have a record of this email address, please check your email address or sign up and get started..."
            }
            else if (Error.message == "The password is invalid or the user does not have a password.") {
              this.alertMessage = "Please ensure that your password is correct."
            }
            else if (Error.message == "The email address is badly formatted.") {
              this.alertMessage = "Please check if your email address is correct, something's not right."
            }
            else {
              this.alertMessage = Error.message;
            }

            swal(this.alertMessage)
            // theOK.style.display = "block";
            // leader[0].style.display = "none";
          })
        }, Error => {
          // myAlert[0].style.display = "block";
          // theLoader[0].style.display = "none";
          // dismisser[0].style.display = "block"
          if (Error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
            this.alertMessage = "We do not have a record of this email address, please check your email address or sign up and get started..."
          }
          else if (Error.message == "The password is invalid or the user does not have a password.") {
            this.alertMessage = "Please ensure that your password is correct."
          }
          else if (Error.message == "The email address is badly formatted.") {
            this.alertMessage = "Please check if your email address is correct, something's not right."
          }
          else {
            this.alertMessage = Error.message;
          }
          swal(this.alertMessage)
        })

      }
  }

  dismissAlert() {
    this.alertMessage = ""
    let myAlert = document.getElementsByClassName("overlayer") as HTMLCollectionOf<HTMLElement>;
    let theLoader = document.getElementsByClassName("loader") as HTMLCollectionOf<HTMLElement>;
    myAlert[0].style.display = "none";
    theLoader[0].style.display = "block"
  }


  forgotpassword(email) {
    swal(this.alertMessage)
    // let myAlert = document.getElementsByClassName("overlayer") as HTMLCollectionOf<HTMLElement>;
    // let theLoader = document.getElementsByClassName("loader") as HTMLCollectionOf<HTMLElement>;
    //   myAlert[0].style.display = "block";
    //   theLoader[0].style.display = "block"

      // this.alertMessage = "Loading..."
      if (email == undefined || email == "") {
        this.alertMessage = "Please enter your email address to reset your password"
        // myAlert[0].style.display = "block";
        // theLoader[0].style.display = "none"
      }
      else {
        return new Promise<void>((resolve, reject) => {
          firebase.auth().sendPasswordResetEmail(email).then(() => {
            this.alertMessage = "We have sent you a link to reset your password, check your email."
            // myAlert[0].style.display = "block";
            // theLoader[0].style.display = "none"
          }, Error => {
            this.alertMessage = Error.message
            // myAlert[0].style.display = "block";
            // theLoader[0].style.display = "none"
          });
        })
      }

  }
  goToSignIn() {
    this._ngZone.run(() => {
      this.router.navigate(['/sign-up'])
    })
  }


}
