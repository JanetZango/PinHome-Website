import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';


import swal from 'sweetalert';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
declare var firebase;
declare var google;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userId;
  dbPath;
  message;
  select;
  desc;
  address;

  fName; sName; orgName; email; mobile; tel; password; Confirm; contact;

  urlCover = "../../assets/imgs/facade.jpg";
  urlLogo = "../../assets/imgs/clip art.png";
  alertMessage = "Please wait..."

  constructor(public router: Router, private _ngZone: NgZone) { }

  ngOnInit() {
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
    this.alertMessage = ""
    let myAlert = document.getElementsByClassName("overlayer") as HTMLCollectionOf<HTMLElement>;
    let theLoader = document.getElementsByClassName("loader") as HTMLCollectionOf<HTMLElement>;
    myAlert[0].style.display = "none";
  }

  goToSignIn() {
    this._ngZone.run(() => {
      this.router.navigate(['/sign-in'])
    })
  }

  getcoo(address) {

    return new Promise((accpt, rej) => {
      this._ngZone.run(() => {
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
              city: arr2.long_name
            }
            console.log(position)
            accpt(position)
          }
        });
      })
    })
  }

  showPage2() {
    // alert ( "Oops, something went wrong!" )
    // this.router.navigate(['/more'])
    var page2 = document.getElementById("secondpage");

    var page1 = document.getElementById("firstpage");
    // let myAlert = document.getElementsByClassName("overlayer") as HTMLCollectionOf<HTMLElement>;
    // let theLoader = document.getElementsByClassName("loader") as HTMLCollectionOf<HTMLElement>;

    if (this.orgName == " " || this.orgName == null) {
      swal("Please fill in the Organisation Name to continue.");
      // Swal.hideLoading()
    }
    else if (this.select == " " || this.select == null) {
      swal("Please fill in the organisation's category to continue.")
      // Swal.hideLoading()
    }
    else if (this.email == " " || this.email == null) {
      swal("Please fill in the Organisation's email address to continue.");
      // Swal.hideLoading()
    }
    else if (this.password = "" || this.password == null) {
      swal("Please enter your password (8 characters or more) to continue.");
      // Swal.hideLoading()
    }
    else {
      if (this.password.length < 8) {
        swal("Your password has to be 8 characters or more");
        // Swal.hideLoading()
      }
      else {

        page2.style.display = "block"
        page1.style.display = "none"
      }

    }


    // myAlert[0].style.display = "block";
    // theLoader[0].style.display = "block"
    // this.alertMessage = "loading"
    // if (this.orgName == undefined || this.orgName == "") {
    //   // alert('orgname is missing');
    //   myAlert[0].style.display = "block";
    //   theLoader[0].style.display = "none"
    //   this.alertMessage = 'Please insert the name of your organisation'
    // }
    // else if (this.email == undefined || this.email == "") {
    //   // alert('email is missing');
    //   myAlert[0].style.display = "block";
    //   theLoader[0].style.display = "none"
    //   this.alertMessage = 'Please insert your organisation email'
    // }
    // else if (this.select == undefined || this.select == "") {
    //   // alert('category is missing');
    //   myAlert[0].style.display = "block";
    //   theLoader[0].style.display = "none"
    //   this.alertMessage = 'Please choose the category for your organisation.'
    // }

    // else if (this.password == undefined || this.password == "") {
    //   // alert('password is missing');

    //   myAlert[0].style.display = "block";
    //   theLoader[0].style.display = "none"
    //   this.alertMessage = 'Please enter your password (8 characters or above)'
    // }

    // else {

    //   if(this.password.length < 8){
    //     this.alertMessage = "Please make sure your password has more than 8 characters"
    //     myAlert[0].style.display = "block";
    //     theLoader[0].style.display = "none"
    //   }else{
    //     var firstPage = document.getElementById("first");
    //   var secondPage = document.getElementById("second");
    //   var signIn = document.getElementsByClassName("signIn") as HTMLCollectionOf<HTMLElement>;
    //   var signUp = document.getElementsByClassName("signUp") as HTMLCollectionOf<HTMLElement>;

    //   firstPage.style.display = "none";
    //   signIn[0].style.color = "black"
    //   signUp[0].style.color = "#00eaff";
    //   signUp[0].style.borderBottom = "5px solid #00eaff";
    //   signIn[0].style.borderBottom = "5px solid transparent";

    //   myAlert[0].style.display = "none";
    //   this.message = ""
    //   }

    // }

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
  getPhone(tel) {
    // alert(this.tel);

    let myAlert = document.getElementsByClassName("overlayer") as HTMLCollectionOf<HTMLElement>;
    let theLoader = document.getElementsByClassName("loader") as HTMLCollectionOf<HTMLElement>;
    if (this.tel > 999999999) {

      myAlert[0].style.display = "block";
      theLoader[0].style.display = "none"
      this.alertMessage = "please check your phone numbers, something isn't right, your phone numbers are badly formatted1"
      // alert(this.tel);
    }
    else if (this.tel < 100000000) {
      myAlert[0].style.display = "block";
      theLoader[0].style.display = "none";
      this.alertMessage = "please check your phone numbers, something isn't right, your phone numbers are badly formatted2";
    }
    console.log(event);
  }
  Reg() {
    
    Swal.fire({
      title: 'Verifying',
      html: 'Please wait while we sign you in',
      timer: 200000000000000000000,
      onBeforeOpen: () => {
        Swal.showLoading()
        
      }
    })

    if (this.fName == null || this.fName == " ") {
      swal("Please insert your name.")
      Swal.hideLoading()
    }
    else if (this.urlLogo == "../../assets/imgs/clip art.png") {
      swal("Please insert a logo for your organisation.");
      Swal.hideLoading()
    }
    // else if (this.urlCover == "../../assets/imgs/facade.jpg") {
    //   swal("Please insert a cover photo for your organisation.");
    //   Swal.hideLoading()
    // }
    else if (this.contact == null || this.contact == undefined) {
      // alert(this.tel)
      swal("Please enter your organisation's contact number.");
      Swal.hideLoading()
    }
    else if (this.desc == null || this.desc == " ") {
      swal("Please write a description about your organisation.");
      Swal.hideLoading()
    }
    else if (this.address == null || this.address == " ") {
      swal("Please enter your organisation's address");
      Swal.hideLoading()
    }
    else {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
        firebase.auth().onAuthStateChanged(user => {
          this.getcoo(this.address).then((data: any) => {
            this.userId = user.uid;
            firebase.database().ref('Websiteprofiles/' + user.uid).push({
              respName: this.fName,
              OrganisationName: this.orgName,
              Url: this.urlCover,
              Logo: this.urlLogo,
              Telephone: "0" + this.tel,
              longitude: data.lng,
              desc: this.desc,
              city: data.city,
              category: this.select,
              latitude: data.lat
            });

            this.router.navigate(['/landing-page'])

            Swal.hideLoading()
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
          })
        })
      }, Error => {
        Swal.hideLoading();
        swal(Error.message);
      })
    }
  }

  comboBox() {
    let theLabel = document.getElementById("mySelect");
    theLabel.style.display = "none"
  }



}