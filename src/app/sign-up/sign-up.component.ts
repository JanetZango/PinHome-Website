import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from 'moment';
import swal from "sweetalert";
// ES6 Modules or TypeScript
import Swal from "sweetalert2";
declare var firebase;
declare var google;
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  userId;
  dbPath;
  message;
  select;
  desc;
  address;

  fName;
  sName;
  orgName;
  email;
  name;
  mobile;
  tel;
  password;
  Confirm;
  contact;

  urlCover = "../../assets/imgs/Map Template/default-cover.jpg";
  urlLogo = "../../assets/imgs/Dp.jpg";
  alertMessage = "Please wait...";

  constructor(public router: Router, private _ngZone: NgZone) {
    this.name = "";
    this.desc = "";
    this.fName = "";
    this.address = "";
    this.contact = "";
    this.email = "";
    this.orgName = "";
  }

  ngOnInit() {}
  InsertPicture(event: any) {
    this._ngZone.run(() => {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.urlCover = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        // this.coverPhoto = "Choose another cover photo"
      }
    });
  }
  InsertLogo(event: any) {
    this._ngZone.run(() => {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.urlLogo = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        // this.logoPhoto = "Choose a different logo";
      }
    });
  }

  dismissAlert() {
    this.alertMessage = "";
    let myAlert = document.getElementsByClassName(
      "overlayer"
    ) as HTMLCollectionOf<HTMLElement>;
    let theLoader = document.getElementsByClassName(
      "loader"
    ) as HTMLCollectionOf<HTMLElement>;
    // myAlert[0].style.display = "none";
  }

  goToSignIn() {
    this._ngZone.run(() => {
      this.router.navigate(["/sign-in"]);
    });
  }

  getcoo(address) {
    return new Promise((accpt, rej) => {
      this._ngZone.run(() => {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, function(results, status) {
          var arr = results[0].address_components;
          var arr2 = arr[3];
          if (status == google.maps.GeocoderStatus.OK) {
            this.latitude = results[0].geometry.location.lat();
            this.longitude = results[0].geometry.location.lng();
            let position = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
              city: arr2.long_name
            };
            console.log(position);
            accpt(position);
          }
        });
      });
    });
  }

  showPage2(select, name, email, pass) {
    this.select = select;
    this.orgName = name;
    this.email = email;
    this.password = pass;

    // alert("click");
    // alert ( "Oops, something went wrong!" )
    // this.router.navigate(['/more'])

    var firstPage = document.getElementById("firstpage");
    var secondPage = document.getElementById("secondpage");
    var signIn = document.getElementsByClassName("signIn") as HTMLCollectionOf<
      HTMLElement
    >;
    var signUp = document.getElementsByClassName("signUp") as HTMLCollectionOf<
      HTMLElement
    >;
    var page2 = document.getElementById("secondpage");

    if (this.select == "" || this.select == null) {
      Swal.fire({
        title: "Error!",
        text: "Please select a category for your organisation",
        type: "error",
        confirmButtonText: "OK"
      });
    } else if (this.orgName == "" || this.orgName == null) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a name for your organisation",
        type: "error",
        confirmButtonText: "OK"
      });
    }
    if (this.email == "" || this.email == null) {
      Swal.fire({
        title: "Error!",
        text: "Please enter an email for your organisation",
        type: "error",
        confirmButtonText: "OK"
      });
    } else if (this.password == "" || this.password == null) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a password",
        type: "error",
        confirmButtonText: "OK"
      });
    } else {
      if(this.password.length < 6){
        Swal.fire({
          title: "Error!",
          text: "Please enter a password with at least 6 characters",
          type: "error",
          confirmButtonText: "OK"
        });
      }
      else{
        // alert(this.password)
      firstPage.style.display = "none";
      secondPage.style.display = "block";
      signIn[0].style.color = "black";
      signUp[0].style.color = "#00eaff";
      signUp[0].style.borderBottom = "5px solid #00eaff";
      signIn[0].style.borderBottom = "5px solid transparent";
    }
  }


    // myAlert[0].style.display = "block";
    // theLoader[0].style.display = "block"
    this.alertMessage = "loading";
    if (this.orgName == undefined || this.orgName == "") {
      // alert('orgname is missing');
      // myAlert[0].style.display = "block";
      // theLoader[0].style.display = "none"
      this.alertMessage = "Please insert the name of your organisation";
    } else if (this.email == undefined || this.email == "") {
      // alert('email is missing');
      // myAlert[0].style.display = "block";
      // theLoader[0].style.display = "none"
      this.alertMessage = "Please insert your organisation email";
    } else if (this.select == undefined || this.select == "") {
      // alert('category is missing');
      // myAlert[0].style.display = "block";
      // theLoader[0].style.display = "none"
      this.alertMessage = "Please choose the category for your organisation.";
    } else if (this.password == undefined || this.password == "") {
      // alert('password is missing');

      // myAlert[0].style.display = "block";
      // theLoader[0].style.display = "none"
      this.alertMessage = "Please enter your password (8 characters or above)";
    } else {
      if (this.password.length < 8) {
        // swal("Your password has to be 8 characters or more");
        // Swal.hideLoading()
      } else {
        if (this.password.length < 8) {
          this.alertMessage =
            "Please make sure your password has more than 8 characters";
          // myAlert[0].style.display = "block";
          // theLoader[0].style.display = "none"
        } else {
          // myAlert[0].style.display = "none";
          this.message = "";
        }
      }
    }
  }
  showPage1($event) {
    var firstPage = document.getElementById("firstpage");
    var secondPage = document.getElementById("secondpage");
    var signIn = document.getElementsByClassName("signIn") as HTMLCollectionOf<
      HTMLElement
    >;
    var signUp = document.getElementsByClassName("signUp") as HTMLCollectionOf<
      HTMLElement
    >;

    firstPage.style.display = "block";
    signIn[0].style.color = "#00eaff";
    signUp[0].style.color = "black";
    signIn[0].style.borderBottom = "5px solid #00eaff";
    signUp[0].style.borderBottom = "5px solid transparent";
  }
  getPhone() {
    // alert(this.tel);

    let myAlert = document.getElementsByClassName(
      "overlayer"
    ) as HTMLCollectionOf<HTMLElement>;
    let theLoader = document.getElementsByClassName(
      "loader"
    ) as HTMLCollectionOf<HTMLElement>;
    if (this.tel > 999999999) {
      // myAlert[0].style.display = "block";
      // theLoader[0].style.display = "none"
      this.alertMessage =
        "please check your phone numbers, something isn't right, your phone numbers are badly formatted1";
      // alert(this.tel);
    } else if (this.tel < 100000000) {
      // myAlert[0].style.display = "block";
      // theLoader[0].style.display = "none";
      this.alertMessage =
        "please check your phone numbers, something isn't right, your phone numbers are badly formatted2";
    }
    console.log(event);
  }
  Reg(con, desc) {
    this.contact = con;
    this.desc = desc;
    console.log(this.fName);
    console.log(this.contact);
    console.log(this.address);
    console.log(this.desc);

    Swal.fire({
      title: "Loading",
      html: this.alertMessage,
      // timer: 4000,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    }).then(result => {});
    this.alertMessage = "Please wait...";
    let myAlert = document.getElementsByClassName(
      "overlayer"
    ) as HTMLCollectionOf<HTMLElement>;
    let theLoader = document.getElementsByClassName(
      "loader"
    ) as HTMLCollectionOf<HTMLElement>;
    let dismissBtn = document.getElementsByClassName(
      "dismissBtn"
    ) as HTMLCollectionOf<HTMLElement>;

    // myAlert[0].style.display = "block";
    // theLoader[0].style.display = "block"
    // dismissBtn[0].style.display = "none"
    if (this.fName == undefined || this.fName == "") {
      // alert('Representative name is missing');
      this.alertMessage = "Please enter your name";
      Swal.close();
      swal("Name Field Missing", this.alertMessage, "error");

      // myAlert[0].style.display = "block";
      // theLoader[0].style.display = "none";
      // dismissBtn[0].style.display = "block"
    } else if (this.contact == undefined || this.contact == "") {
      // alert('phone numbers missing')
      this.alertMessage = "Please insert your organisation's contact numbers";
      Swal.close();
      // myAlert[0].style.display = "block";
      Swal.hideLoading();
      swal("Field Missing", this.alertMessage, "error");
      // theLoader[0].style.display = "none";
      // dismissBtn[0].style.display = "block"
    } else if (this.address == undefined || this.address == "") {
      // alert("address is missing")
      this.alertMessage = "Please fill in your address";
      Swal.close();
      Swal.hideLoading();
      swal("Field Missing", this.alertMessage, "error");
      // myAlert[0].style.display = "block";
      // theLoader[0].style.display = "none";
      // dismissBtn[0].style.display = "block"
    } else if (this.desc == undefined || this.desc == "") {
      // alert('desc is missing')
      this.alertMessage = "Please fill in the organisation's description";
      Swal.close();
      Swal.hideLoading();
      swal("Field Missing", this.alertMessage, "error");
      // myAlert[0].style.display = "block";
      // theLoader[0].style.display = "none";
      // dismissBtn[0].style.display = "block"
    } else if (this.urlCover == "../../assets/imgs/Map Template/default-cover.jpg") {
      // alert('cover img not selected');
      this.alertMessage = "Please choose a cover photo";
      Swal.close();
      Swal.hideLoading();
      swal("Field Missing", this.alertMessage, "error");
      // myAlert[0].style.display = "block";
      // theLoader[0].style.display = "none";
      // dismissBtn[0].style.display = "block"
    } else if (this.urlLogo == "../../assets/imgs/Dp.jpg") {
      // alert('logo not selected')
      this.alertMessage = "Please choose your logo";
      Swal.close();
      Swal.hideLoading();
      swal("Field Missing", this.alertMessage, "error");
      // myAlert[0].style.display = "block";
      // theLoader[0].style.display = "none";
      // dismissBtn[0].style.display = "block"
    } else {
      if (this.tel > 999999999) {
        // myAlert[0].style.display = "block";
        // theLoader[0].style.display = "none"
        this.alertMessage =
          "please check your phone numbers, something isn't right, your phone numbers are badly1";
        Swal.hideLoading();
        Swal.close();
        swal("Field Missing", this.alertMessage, "error");
        // alert(this.tel);
      } else if (this.tel < 100000000) {
        // myAlert[0].style.display = "block";
        // theLoader[0].style.display = "none";
        Swal.hideLoading();
        Swal.close();
        this.alertMessage =
          "please check your phone numbers, something isn't right, your phone numbers are badly2";
          swal("Field Missing", this.alertMessage, "error");
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            () => {
              
              firebase.auth().onAuthStateChanged(user => {
                var user = firebase.auth().currentUser
                this.getcoo(this.address).then((data: any) => {
                    
                  this.userId = user.uid;
                  var day = moment().format('MMMM Do YYYY, h:mm:ss a');
                  firebase
                    .database()
                    .ref("Websiteprofiles/" + user.uid + '/')
                    .push({
                      respName: this.fName,
                      OrganisationName: this.orgName,
                      Url: this.urlCover,
                      Logo: this.urlLogo,
                      Telephone: this.contact,
                      longitude: data.lng,
                      desc: this.desc,
                      city: data.city,
                      category: this.select,
                      latitude: data.lat,
                      Email : user.email,
                      date : day
                    });
                  Swal.close();
                  this.router.navigate(["/landing-page"]);
                  this.alertMessage =
                    "We've sent you an email with a verification link, please check your email and click the link to verify your account to continue.";
                  Swal.hideLoading();
                  Swal.close();
                  //   myAlert[0].style.display = "block";
                  //  theLoader[0].style.display = "none"
                  //  dismissBtn[0].style.display = "block"
                });
              });
            },
            Error => {
              // myAlert[0].style.display = "block";
              // theLoader[0].style.display = "none"
              // dismissBtn[0].style.display = "block"
              // alert(Error.message);

              if (Error.message == "Password should be at least 6 characters") {
                this.alertMessage =
                  "Please make sure that your password has 6 characters or more";
                Swal.close();
                swal(this.alertMessage);
              } else if (
                Error.message == "The email address is badly formatted."
              ) {
                this.alertMessage =
                  "Please check your email address, we think something's not right";
                Swal.close();
                swal(this.alertMessage);
              } else {
                this.alertMessage = Error.message;
                swal(this.alertMessage);
                Swal.close();
                // this.alertMessage = "Something went wrong, please check if your information is correct, try logging in or try again later."
              }
            }
          );
      }
    }
  }
  reg() {
    alert("clicked");
    // document.getElementById("firstpage").style.display = "none";
    // if(this.orgName){

    // }
  }
  comboBox() {
    let theLabel = document.getElementById("mySelect");
    theLabel.style.display = "none";
  }
}
