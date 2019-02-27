import { Component, OnInit, NgZone } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Injectable } from "@angular/core";
import { promise, Capability } from "protractor";
import { Router } from "@angular/router";
declare var google;
declare var firebase;

import { ChangeDetectorRef } from "@angular/core";
import swal from "sweetalert";
// ES6 Modules or TypeScript
import Swal from "sweetalert2";
@Component({
  selector: "app-adding-data",
  templateUrl: "./adding-data.component.html",
  styleUrls: ["./adding-data.component.css"]
})
export class AddingDataComponent {
  coverPhoto = "Upload Cover Photo";
  logoPhoto = "Upload Logo";
  galleryupload = "Upload Images";
  long;
  latitude;
  name;
  urlCover = "../../assets/imgs/default-cover.jpg";
  organization;
  contacts;
  message;
  OrganizationAdress;
  address: any;
  lat: any;
  lng;
  urlLogo: any = "../../assets/imgs/PinHome icon.png";
  urlGallery = "../../assets/imgs/default image/default image for uploads.jpg";
  emailAdd;
  AboutOrg;
  select;
  price;
  state;
  urlGallery1 = "../../assets/imgs/default image/default image for uploads.jpg";
  urlGallery2 = "../../assets/imgs/default image/default image for uploads.jpg";
  city: any;

  alertMessage = "Please wait...";

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private _ngZone: NgZone
  ) {}
  ngOnInit() {}

  initMap(address) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
      }
      let myLatLng = { lat: this.latitude, lng: this.longitude };
      this.objectArray = "test";
      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: myLatLng,
        disableDefaultUI: true,
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#8ec3b9"
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1a3646"
              }
            ]
          },
          {
            featureType: "administrative.country",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#4b6878"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#64779e"
              }
            ]
          },
          {
            featureType: "administrative.province",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#4b6878"
              }
            ]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#334e87"
              }
            ]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [
              {
                color: "#023e58"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#283d6a"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#6f9ba5"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#023e58"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#3C7680"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#304a7d"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#98a5be"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#2c6675"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#255763"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#b0d5ce"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#023e58"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#98a5be"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#283d6a"
              }
            ]
          },
          {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [
              {
                color: "#3a4762"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#0e1626"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#4e6d70"
              }
            ]
          }
        ]

        // mapTypeId: 'terrain'
      });
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "Hello World!"
      });
    });
  }

  // change() {
  //   // this.cdRef.detectChanges();
  //   // console.log(value);
  //   // this.contacts= value.length > 10 ? value.substring(0,1) : value;

  //   // if(value == 0){
  //   //   console.log("the val");

  //   // }

  //   let myAlert = document.getElementsByClassName("overlayer") as HTMLCollectionOf<HTMLElement>;
  //   let theLoader = document.getElementsByClassName("loader") as HTMLCollectionOf<HTMLElement>;
  //   var dismissBtn = document.getElementsByClassName("dismissBtn") as HTMLCollectionOf<HTMLElement>;

  //   this.alertMessage = "Please wait..."
  //   myAlert[0].style.display = "block";
  //   theLoader[0].style.display = "block";
  //   dismissBtn[0].style.display = "none";
  //   if (this.contacts < 100000000) {
  //     console.log("less than 10");

  //     this.alertMessage = "please check your phone numbers, your phone numbers are badly formatted."
  //     myAlert[0].style.display = "block";
  //     theLoader[0].style.display = "none";
  //     dismissBtn[0].style.display = "block";
  //   }
  //   else if (this.contacts > 999999999){
  //     console.log("greater than 10");

  //     this.alertMessage = "please check your phone numbers, your phone numbers are badly formatted."
  //     myAlert[0].style.display = "block";
  //     theLoader[0].style.display = "none";
  //     dismissBtn[0].style.display = "block";
  //   }else{
  //     myAlert[0].style.display = "none"
  //   }

  // }

  cell;
  getPhone(event) {
    // alert(this.tel);
    console.log(this.contacts);
    this.cell = this.contacts;

    let myAlert = document.getElementsByClassName(
      "overlayer"
    ) as HTMLCollectionOf<HTMLElement>;
    let theLoader = document.getElementsByClassName(
      "loader"
    ) as HTMLCollectionOf<HTMLElement>;
    if (this.contacts > 999999999) {
      myAlert[0].style.display = "block";
      theLoader[0].style.display = "none";
      this.alertMessage =
        "please check your phone numbers, something isn't right, your phone numbers are badly formatted";
      // alert(this.tel);
    } else if (this.contacts < 100000000) {
      myAlert[0].style.display = "block";
      theLoader[0].style.display = "none";
      this.alertMessage =
        "please check your phone numbers, something isn't right, your phone numbers are badly formatted";
    }
    console.log(event);
  }
  dismissAlert() {
    let myAlert = document.getElementsByClassName(
      "overlayer"
    ) as HTMLCollectionOf<HTMLElement>;

    myAlert[0].style.display = "none";
  }

  scroll(event) {
    console.log("scrolling");
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
  InsertPicture(event: any) {
    this._ngZone.run(() => {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.urlCover = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        this.coverPhoto = "Choose another cover photo";
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
        this.logoPhoto = "Choose a different logo";
      }
    });
  }
  pic1(event: any) {
    alert("me");
    this._ngZone.run(() => {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.urlGallery = event.target.result;
          console.log(this.urlGallery);
        };
        reader.readAsDataURL(event.target.files[0]);
        this.galleryupload = "Upload More";
      }
    });
  }

  pic2(event: any) {
    this._ngZone.run(() => {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.urlGallery1 = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        this.galleryupload = "Upload More";
      }
    });
  }

  pic3(event: any) {
    this._ngZone.run(() => {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.urlGallery2 = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        this.galleryupload = "Upload More";
      }
    });
  }

  AddingData() {
    if (this.name == null || this.name == "" || this.name == " ") {
      swal("Please insert the branch name");
    } else if (
      this.OrganizationAdress == null ||
      this.OrganizationAdress == "" ||
      this.OrganizationAdress == " "
    ) {
      swal("Please insert the branch address");
    } else if (this.cell == null || this.cell == "" || this.cell == " ") {
      swal("Please insert the branch contact numbers");
    } else if (
      this.emailAdd == null ||
      this.emailAdd == "" ||
      this.emailAdd == " "
    ) {
      swal("Please insert the branch email address");
    } else if (
      this.urlCover == null ||
      this.urlCover == "" ||
      this.urlCover == " " ||
      this.urlCover == "../../assets/imgs/default-cover.jpg"
    ) {
      swal(
        "Please insert the branch cover photo, this can be the outlook view of the branch, a banner or a photo of the building"
      );
    } else {
      if (this.cell < 100000000 || this.cell > 999999999) {
        swal("Please confirmyour contact numbers, something is wrong.");
      } else {
        Swal.fire({
          title: "Loading",
          html: this.alertMessage,
          // timer: 4000,
          onBeforeOpen: () => {
            Swal.showLoading();
          }
        }).then(result => {});

        firebase.auth().onAuthStateChanged(user => {
          this.getcoo(this.OrganizationAdress).then((data: any) => {
            this.long = data.lat;
            firebase
              .database()
              .ref("OrganizationList/" + user.uid + "/")
              .push(
                {
                  OrganizationName: this.name,
                  OrganizationAdress: this.OrganizationAdress,
                  ContactDetails: "0" + this.cell,
                  Email: this.emailAdd,
                  Url: this.urlCover,
                  Logo: this.urlLogo,
                  longitude: data.lng,
                  city: data.city,
                  latitude: data.lat
                },
                Error => {
                  swal(Error.message);
                }
              );
            Swal.close();
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: "success",
              title: "Branch added successfully"
            });
            this.router.navigate(["/landing-page"]);

            // alert('data added')
            console.log(this.OrganizationAdress);
          });
        });
      }
    }
  }
  CheckNumber() {}

  goToMap() {
    this.router.navigate(["/landing-page"]);
  }
  goToProfile() {
    this.router.navigate(["/profile"]);
  }
  goToSignIn() {
    alert("clicked");
  }
  decideState() {
    if (this.state == 0) {
      this.showSlide();
    } else {
      this.hideSlide();
    }

    console.log(this.state);
  }

  showSlide() {
    let slider = document.getElementsByClassName(
      "absolutely"
    ) as HTMLCollectionOf<HTMLElement>;
    let arrow = document.getElementsByClassName("clicker") as HTMLCollectionOf<
      HTMLElement
    >;

    arrow[0].style.left = "48%";
    arrow[0].style.transform = "translateX(-60%)";
    arrow[0].style.transform = "rotateZ(180DEG)";
    slider[0].style.bottom = "0";

    this.state = 1;
  }
  hideSlide() {
    let slider = document.getElementsByClassName(
      "absolutely"
    ) as HTMLCollectionOf<HTMLElement>;
    let arrow = document.getElementsByClassName("clicker") as HTMLCollectionOf<
      HTMLElement
    >;

    arrow[0].style.left = "48%";
    arrow[0].style.transform = "translateX(-60%)";
    arrow[0].style.transform = "rotateZ(0DEG)";
    slider[0].style.bottom = "-200px";

    this.state = 0;
  }
}
