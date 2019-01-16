import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from'@angular/router';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: any;
  state;
  sign = "Sign In";
  sign2 = "Sign Up";
  img = "../assets/imgs/Dp.jpg"
  orgDetails: AngularFireList<any>;
 Orgs: Observable<any[]>
 userId;
 dbPath
 email;

  constructor(private authen : AngularFireAuth, public router: Router, private db: AngularFireDatabase){
    console.log('ok')
    this.authen.auth.onAuthStateChanged(user =>{
      console.log(user)
      if (user){
        this.state = 1;
        this.sign = "Sign Out";
        this.sign2 = "";
        this.router.navigate(['/adding-data'])
      }
      else{
        console.log('no user')
        this.state = 0;
      }
      console.log(this.sign)
     });
  }



  show(){
    alert('message');
    var greet = document.getElementsByClassName("greeting") as HTMLCollectionOf <HTMLElement>;
    greet[0].style.display = "none";
  }

  profile(){
    if (this.state == 0){
      alert('please login first')
    }
    else{

      this.router.navigate(['/profile'])
    }
  }
  signin(){
    window.location.reload();
    this.router.navigate(['/sign-in'])
  }
}