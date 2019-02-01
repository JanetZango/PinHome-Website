import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from'@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: any;
  state;
  img = "../assets/imgs/Dp.jpg"
  orgDetails: AngularFireList<any>;
 Orgs: Observable<any[]>
 userId;
 dbPath;
 message;
 email;

  constructor(private authen : AngularFireAuth, public router: Router, private db: AngularFireDatabase){
    console.log('ok')
    // let prof = document.getElementsByClassName("profile") as HTMLCollectionOf <HTMLElement>;
    // let signOutBtn = document.getElementsByClassName("buttonClick") as HTMLCollectionOf <HTMLElement>;

    this.authen.auth.onAuthStateChanged(user =>{
      console.log(user)
      if (user){
        this.state = 1;
        // prof[0].style.display = "block";
        // signOutBtn[0].style.display = "block";
        this.router.navigate(['/landing-page']);
      }
      else{
        console.log('no user')
        this.state = 0;
        this.router.navigate(['/sign-in']);
        // prof[0].style.display = "none";
        // signOutBtn[0].style.display = "none";
      }
     });
  }



  show(){
    this.router.navigate(['/adding-data']);
  }

  // dismissAlert(){
  //   let alerter = document.getElementsByClassName('customAlert') as HTMLCollectionOf <HTMLElement>;
  //   alerter[0].style.left = "-100%";
  // }

  profile(){
    let alerter = document.getElementsByClassName('customAlert1') as HTMLCollectionOf <HTMLElement>;
    let h = window.innerHeight;


    if (this.state == 0){
      alerter[0].style.top = (h/3.5) + "px";
      alerter[0].style.left = "50%"; 
      alerter[0].style.zIndex = "10000"
      alerter[0].style.transform = "translateX(-50%)"
      this.message = "You have to sign in to view your your profile, click 'Sign In' or 'Sign Up' to get started."
    }
    else{

      this.router.navigate(['/profile'])
    }
  }
  // signin(){
  //   window.location.reload();
  //   this.router.navigate(['/sign-in'])
  // }

  signOut(){
    this.router.navigate(['/sign-in'])
  }
}