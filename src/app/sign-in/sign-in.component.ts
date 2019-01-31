import { Component, OnInit, NgZone } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

declare var google;
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
       this.initMap();
  }

  goToSignUp(){
    this.router.navigate(['/sign-up'])
  }


  initMap() {
    this._ngZone.run(() =>{
    let geocoder = new google.maps.Geocoder();
    // geocoder.geocode({ 'address': address }, function (results, status) {
      
      // if (status == google.maps.GeocoderStatus.OK) {
      //   this.latitude = results[0].geometry.location.lat();
      //   this.longitude = results[0].geometry.location.lng();
      // }
      // let myLatLng = { lat: this.latitude, lng: this.longitude };
      // this.objectArray = "test"
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        // center: myLatLng,
        // mapTypeId: 'terrain'
      });
      let marker = new google.maps.Marker({
        // position: myLatLng,
        map: map,
        title: 'Hello World!'
      });
    // })
  })
  }

login(email,password){
  this._ngZone.run(() =>{
    let myAlert = document.getElementsByClassName("customAlert0") as HTMLCollectionOf <HTMLElement>;
    let theOK = document.getElementById("theOkay" );
    let leader = document.getElementsByClassName("loading") as HTMLCollectionOf <HTMLElement>
    let b = window.innerHeight;

    myAlert[0].style.top = (b / 3.5) + "px";
    myAlert[0].style.left = "50%";
    myAlert[0].style.transform = "translateX(-54%)"
    if(email == "" || email == null || email == undefined){
      this.message = "Please insert your email";
      theOK.style.display = "block";
      leader[0].style.display = "none";
      console.log('no email');
      
    }
    else if(password == "" || password == null || password == undefined){
      this.message = "Please insert your password";
      theOK.style.display = "block";
      leader[0].style.display = "none";
      console.log('no pass');
    }
    else{
 
        this.message = "Loading...";
        theOK.style.display = "none";
        leader[0].style.display = "block"

        this.results = this.authen.auth.signInWithEmailAndPassword(email,password).then(()=>{
          this.results = this.authen.authState.subscribe(user =>{
          this.userId =  user.uid;
          myAlert[0].style.top = (b/3.5) + "px";
          myAlert[0].style.left = "2.3%"; 
          
          if (user.emailVerified == false){
            user.sendEmailVerification();
            alert('Please go to your email and click the verification link')
            this.authen.auth.signOut();
          }
          else{
            this.router.navigate(['/adding-data'])
          }
           })
          }, Error =>{

            this.message = Error.message
            console.log(Error.message);
            
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

  // forgotpassword(email: string) {
  //   return this.afAuth.auth.sendPasswordResetEmail(email)
  //     .then(() => console.log('sent Password Reset Email!'))
  //     .catch((error) => console.log(error))
  // }
  
})
  }
  goToSignIn() {
    this._ngZone.run(() =>{
    this.router.navigate(['/sign-up'])
    })
  }


}
