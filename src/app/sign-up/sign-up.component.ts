import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

declare var google;
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
  select;
  desc;
  address;

  fName; sName; orgName; email; mobile; tel; password; Confirm;

  urlCover = "../../assets/imgs/facade.jpg";
  urlLogo = "../../assets/imgs/clip art.png" 

  constructor(private authen: AngularFireAuth, public db: AngularFireDatabase, public router: Router, private _ngZone: NgZone) { }

  ngOnInit() {
  }

  InsertPicture(event: any) {
    this._ngZone.run(() =>{
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
    this._ngZone.run(() =>{
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
    this._ngZone.run(() =>{
    this.router.navigate(['/sign-in'])
    })
  }

  getcoo(address) {

    return new Promise((accpt, rej) => {
      this._ngZone.run(() =>{
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address }, function (results, status) {
        var arr = results[0].address_components;
        var arr2 = arr[3]
        if (status == google.maps.GeocoderStatus.OK) {
          this.latitude = results[0].geometry.location.lat();
          this.longitude = results[0].geometry.location.lng();
          let position = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
            city : arr2.long_name
          }
          console.log(position)
          accpt(position)
        }
      });
    })
  })
  }
  
  showPage2(){
    if (this.orgName == undefined || this.orgName == ""){
      alert('orgname is missing')
    }
    else if (this.email == undefined ||  this.email == ""){
      alert('email is missing')
    }
    else if (this.select == undefined ||  this.select == ""){
      alert('category is missing')
    }
    else if (this.password == undefined || this.password == ""){
      alert('password is missing')
    }
    else{
    var firstPage = document.getElementById("first");
    var secondPage = document.getElementById("second");
    var signIn = document.getElementsByClassName("signIn") as HTMLCollectionOf <HTMLElement>;
    var signUp = document.getElementsByClassName("signUp") as HTMLCollectionOf <HTMLElement>;

    firstPage.style.display = "none";
    signIn[0].style.color= "black"
    signUp[0].style.color= "#00eaff";
    signUp[0].style.borderBottom= "5px solid #00eaff";
    signIn[0].style.borderBottom= "5px solid transparent";
  }

  }
  showPage1($event){
    var firstPage = document.getElementById("first");
    var secondPage = document.getElementById("second");
    var signIn = document.getElementsByClassName("signIn") as HTMLCollectionOf <HTMLElement>;
    var signUp = document.getElementsByClassName("signUp") as HTMLCollectionOf <HTMLElement>;

    firstPage.style.display = "block";
    signIn[0].style.color= "#00eaff"
    signUp[0].style.color= "black"
    signIn[0].style.borderBottom= "5px solid #00eaff";
    signUp[0].style.borderBottom= "5px solid transparent";
  }

Reg(){
if (this.fName == undefined || this.fName == ""){
  alert('Representative name is missing')
}
else if (this.tel == undefined || this.tel == ""){
  alert('phone numbers missing')
}
else if (this.address == undefined ||  this.address == ""){
  alert("address is missing")
}
else if (this.desc == undefined || this.desc == ""){
  alert('desc is missing')
}
else if (this.urlCover ==  "../../assets/imgs/facade.jpg" ){
  alert('cover img not selected')
}
else if (this.urlLogo == "../../assets/imgs/clip art.png" ){
  alert('logo not selected')
}
else{
  this.authen.auth.createUserWithEmailAndPassword(this.email, this.password).then(() => {
    this.authen.auth.onAuthStateChanged(user => {
      this.getcoo(this.address).then((data: any) => {
      this.userId = user.uid;
      this.dbPath = 'Websiteprofiles/' + this.userId;
      this.userRef = this.db.list(this.dbPath);
      this.userRef.push({
        respName: this.fName,
        OrganisationName: this.orgName,
        Url: this.urlCover,
        Logo:this.urlLogo,
        Telephone: "0" + this.tel,
        longitude: data.lng,
        desc : this.desc,
        city : data.city,
        category :  this.select,
        latitude: data.lat
      });
      this.router.navigate(['/landing-page'])
      alert('check email verification link, go to your email address and click it')
    })
    })
  }, Error => {
    this.message = Error.message
    alert(Error.message);
  })
}

}
  comboBox(){
      let theLabel = document.getElementById("mySelect");
      theLabel.style.display = "none"
  }


}
