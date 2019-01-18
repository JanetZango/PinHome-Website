import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userRef: AngularFireList<any>;
  userId;
  dbPath;
  message;

  fName; sName; orgName; email; mobile; tel; password; Confirm;

  constructor(private authen: AngularFireAuth, public db: AngularFireDatabase, public router: Router) { }

  ngOnInit() {
  }

  register() {

    let yourAlert = document.getElementsByClassName("customAlert4") as HTMLCollectionOf<HTMLElement>;
    let myOk = document.getElementById("theOkay");
    let leader1 = document.getElementsByClassName("loading") as HTMLCollectionOf <HTMLElement>
    let b = window.innerHeight

    yourAlert[0].style.top = (b / 3.5) + "px";
    yourAlert[0].style.left = "50%";
    yourAlert[0].style.transform = "translateX(-54%)"

    myOk.style.display = "none";
    leader1[0].style.display = "block"

    if (this.fName == undefined || this.fName == "") {
      leader1[0].style.display = "none"
      myOk.style.display = "block";
      this.message = "Please enter your first name(s)";


    }
    else if (this.sName == undefined || this.sName == "") {
      leader1[0].style.display = "none"
      myOk.style.display = "block";
      this.message = "Please enter your last name";

      // yourAlert[0].style.top = (b / 3.5) + "px";
      // yourAlert[0].style.left = "50%";
      // yourAlert[0].style.transform = "translateX(-54%)"
    }
    else if (this.orgName == undefined || this.orgName == "") {
      leader1[0].style.display = "none"
      myOk.style.display = "block";
      this.message = "Please enter your organisation's name"

      // yourAlert[0].style.top = (b / 3.5) + "px";
      // yourAlert[0].style.left = "50%";
      // yourAlert[0].style.transform = "translateX(-54%)"
    }
    else if (this.email == undefined || this.email == "") {
      leader1[0].style.display = "none"
      myOk.style.display = "block";
      this.message = "Please enter your email address"

      // yourAlert[0].style.top = (b / 3.5) + "px";
      // yourAlert[0].style.left = "50%";
      // yourAlert[0].style.transform = "translateX(-54%)"
    }
    else if (this.mobile == undefined || this.mobile == "") {
      leader1[0].style.display = "none"
      myOk.style.display = "block";
      this.message = "Please enter your phone number"

      // yourAlert[0].style.top = (b / 3.5) + "px";
      // yourAlert[0].style.left = "50%";
      // yourAlert[0].style.transform = "translateX(-54%)"
    }
    else if (this.tel == undefined || this.tel == "") {
      leader1[0].style.display = "none"
      myOk.style.display = "block";
      this.message = "Please enter your telephone"

      // yourAlert[0].style.top = (b / 3.5) + "px";
      // yourAlert[0].style.left = "50%";
      // yourAlert[0].style.transform = "translateX(-54%)"
    }
    else if (this.password == undefined || this.password == "") {
      leader1[0].style.display = "none"
      myOk.style.display = "block";
      this.message = "Please enter your password"

      // yourAlert[0].style.top = (b / 3.5) + "px";
      // yourAlert[0].style.left = "50%";
      // yourAlert[0].style.transform = "translateX(-54%)"
    }
    else if (this.Confirm == null || this.Confirm == "") {
      leader1[0].style.display = "none"
      myOk.style.display = "block";
      this.message = "Please confirm your password"

      // yourAlert[0].style.top = (b / 3.5) + "px";
      // yourAlert[0].style.left = "50%";
      // yourAlert[0].style.transform = "translateX(-54%)"
    }
    else if(this.mobile.length >=11 || this.mobile.length < 10){
      leader1[0].style.display = "none"
      myOk.style.display = "block";
      this.message = "Error"
    }
    else if(this.tel.length >=11 || this.tel.length < 10){
      leader1[0].style.display = "none"
      myOk.style.display = "block";
      this.message = "Error"
    }

    else {
      if (this.password == this.Confirm) {
        this.message = "Loading..." 
        
        this.authen.auth.createUserWithEmailAndPassword(this.email, this.password).then(() => {

          this.authen.authState.subscribe(data => {
            this.userId = data.uid;
            this.dbPath = 'Websiteprofiles/' + data.uid;
            this.userRef = this.db.list(this.dbPath);
            this.userRef.push({
              Firstname: this.fName,
              Lastname: this.sName,
              OrganisationName: this.orgName,
              Mobile: this.mobile,
              downloadurl: '../assets/imgs/Dp.jpg',
              Telephone: this.tel
            });
            this.router.navigate(['/adding-data'])
          })
        }, Error => {
          leader1[0].style.display = "none"
          myOk.style.display = "block";
          this.message = Error.message
          // alert(Error.message);

          // yourAlert[0].style.top = (b / 3.5) + "px";
          // yourAlert[0].style.left = "50%";
          // yourAlert[0].style.transform = "translateX(-54%)"
        })
      }
      else {
        leader1[0].style.display = "none";
        myOk.style.display = "block";
        this.message = "Please make sure that your passwords match"
      }
    }



  }

  dismissAlert() {
    let alerter = document.getElementsByClassName('customAlert4') as HTMLCollectionOf<HTMLElement>;
    alerter[0].style.left = "-100%";
    this.message = "" 
  }

  goToSignIn() {
    this.router.navigate(['/sign-in'])
  }
}
