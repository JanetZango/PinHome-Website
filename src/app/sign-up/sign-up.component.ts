import { Component, OnInit, NgZone } from '@angular/core';
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

  urlCover = "../../assets/imgs/facade.jpg";
  urlLogo = "../../assets/imgs/clip art.png";
  alertMessage = "Please wait..."

  constructor(private authen: AngularFireAuth, public db: AngularFireDatabase, public router: Router, private _ngZone: NgZone) { }

  ngOnInit() {
  }

  register(event) {

    // let yourAlert = document.getElementsByClassName("customAlert4") as HTMLCollectionOf<HTMLElement>;
    // let myOk = document.getElementById("theOkay");
    // let leader1 = document.getElementsByClassName("loading") as HTMLCollectionOf <HTMLElement>
    let b = window.innerHeight

    // yourAlert[0].style.top = (b / 3.5) + "px";
    // yourAlert[0].style.left = "50%";
    // yourAlert[0].style.transform = "translateX(-54%)"

    // myOk.style.display = "none";
    // leader1[0].style.display = "block"
    console.log(this.tel.length);


    if (this.fName == undefined || this.fName == "") {
      // leader1[0].style.display = "none"
      // myOk.style.display = "block";
      this.message = "Please enter your first name(s)";


    }
    else if (this.sName == undefined || this.sName == "") {
      // leader1[0].style.display = "none"
      // myOk.style.display = "block";
      this.message = "Please enter your last name";

      // yourAlert[0].style.top = (b / 3.5) + "px";
      // yourAlert[0].style.left = "50%";
      // yourAlert[0].style.transform = "translateX(-54%)"
    }
    else if (this.orgName == undefined || this.orgName == "") {
      // leader1[0].style.display = "none"
      // myOk.style.display = "block";
      this.message = "Please enter your organisation's name"

      // yourAlert[0].style.top = (b / 3.5) + "px";
      // yourAlert[0].style.left = "50%";
      // yourAlert[0].style.transform = "translateX(-54%)"
    }
    else if (this.email == undefined || this.email == "") {
      // leader1[0].style.display = "none"
      // myOk.style.display = "block";
      this.message = "Please enter your email address"

      // yourAlert[0].style.top = (b / 3.5) + "px";
      // yourAlert[0].style.left = "50%";
      // yourAlert[0].style.transform = "translateX(-54%)"
    }
    else if (this.mobile == undefined || this.mobile == "") {
      // leader1[0].style.display = "none"
      // myOk.style.display = "block";
      this.message = "Please enter your phone number"

      // yourAlert[0].style.top = (b / 3.5) + "px";
      // yourAlert[0].style.left = "50%";
      // yourAlert[0].style.transform = "translateX(-54%)"
    }
    else if (this.tel == undefined || this.tel == "") {
      // leader1[0].style.display = "none"
      // myOk.style.display = "block";
      this.message = "Please enter your telephone"

      // yourAlert[0].style.top = (b / 3.5) + "px";
      // yourAlert[0].style.left = "50%";
      // yourAlert[0].style.transform = "translateX(-54%)"
    }
    else if (this.password == undefined || this.password == "") {
      // leader1[0].style.display = "none"
      // myOk.style.display = "block";
      this.message = "Please enter your password"

      // yourAlert[0].style.top = (b / 3.5) + "px";
      // yourAlert[0].style.left = "50%";
      // yourAlert[0].style.transform = "translateX(-54%)"
    }
    else if (this.Confirm == null || this.Confirm == "") {
      // leader1[0].style.display = "none"
      // myOk.style.display = "block";
      this.message = "Please confirm your password"

      // yourAlert[0].style.top = (b / 3.5) + "px";
      // yourAlert[0].style.left = "50%";
      // yourAlert[0].style.transform = "translateX(-54%)"
    }
    else if (this.mobile.length < 9 || this.mobile.length > 9) {
      // leader1[0].style.display = "none"
      // myOk.style.display = "block";
      this.message = "Oops! It looks like your mobile number has either exceed or is below 9 characters."
      console.log(this.tel.length)
    }
    else if (this.tel.length < 9 || this.tel.length > 9) {
      // leader1[0].style.display = "none"
      // myOk.style.display = "block";
      this.message = "Oops! It looks like your telephone number has either exceed or is below 9 characters."
    }

    else {
      if (this.password == this.Confirm) {
        this.message = "Signing in..."

        this.authen.auth.createUserWithEmailAndPassword(this.email, this.password).then(() => {

          this.authen.authState.subscribe(data => {
            this.userId = data.uid;
            this.dbPath = 'Websiteprofiles/' + data.uid;
            this.userRef = this.db.list(this.dbPath);
            this.userRef.push({
              Firstname: this.fName,
              Lastname: this.sName,
              OrganisationName: this.orgName,
              Mobile: "0" + this.mobile,
              downloadurl: '../assets/imgs/Dp.jpg',
              Telephone: "0" + this.tel
            });
            this.router.navigate(['/landing-page'])
            alert('data added')
          })
        }, Error => {
          // leader1[0].style.display = "none"
          // myOk.style.display = "block";
          this.message = Error.message
          // alert(Error.message);

          // yourAlert[0].style.top = (b / 3.5) + "px";
          // yourAlert[0].style.left = "50%";
          // yourAlert[0].style.transform = "translateX(-54%)"
        })
      }
      else {
        // leader1[0].style.display = "none";
        // myOk.style.display = "block";
        this.message = "Please make sure that your passwords match"
      }
    }
  }

  InsertPicture(event: any) {
    this._ngZone.run(() => {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.urlCover = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        // this.coverPhoto = "Choose another cover photo"
      }
    })
  }
  InsertLogo(event: any) {
    this._ngZone.run(() => {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.urlLogo = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        // this.logoPhoto = "Choose a different logo";
      }
    })
  }

  dismissAlert() {
    let alerter = document.getElementsByClassName('customAlert4') as HTMLCollectionOf<HTMLElement>;
    alerter[0].style.left = "-100%";
    this.message = ""
  }

  goToSignIn() {
    this._ngZone.run(() => {
      this.router.navigate(['/sign-in'])
    })
  }


  showPage2(event) {
    this.callAlert()

    var firstPage = document.getElementById("first");
    var secondPage = document.getElementById("second");
    var signIn = document.getElementsByClassName("signIn") as HTMLCollectionOf<HTMLElement>;
    var signUp = document.getElementsByClassName("signUp") as HTMLCollectionOf<HTMLElement>;

    firstPage.style.display = "none";
    signIn[0].style.color = "black"
    signUp[0].style.color = "#00eaff";
    signUp[0].style.borderBottom = "5px solid #00eaff";
    signIn[0].style.borderBottom = "5px solid transparent";
  }
  showPage1($event) {
    var firstPage = document.getElementById("first");
    var secondPage = document.getElementById("second");
    var signIn = document.getElementsByClassName("signIn") as HTMLCollectionOf<HTMLElement>;
    var signUp = document.getElementsByClassName("signUp") as HTMLCollectionOf<HTMLElement>;

    firstPage.style.display = "block";
    signIn[0].style.color = "#00eaff"
    signUp[0].style.color = "black"
    signIn[0].style.borderBottom = "5px solid #00eaff";
    signUp[0].style.borderBottom = "5px solid transparent";
  }

  comboBox() {
    let theLabel = document.getElementById("mySelect");
    theLabel.style.display = "none"
  }
  callAlert() {
    if(){
      
    }
    let myAlert = document.getElementsByClassName("overlayer") as HTMLCollectionOf <HTMLElement>;
    let theLoader = document.getElementsByClassName("loader") as HTMLCollectionOf <HTMLElement>;
    myAlert[0].style.display= "block";
    theLoader[0].style.border =""
    this.alertMessage = "Alert called";
  }


}
