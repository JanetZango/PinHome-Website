import { Component, OnInit, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Injectable } from '@angular/core';
import { promise, Capability } from 'protractor';
import {Router} from'@angular/router';
declare var google;
declare var firebase;

import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-adding-data',
  templateUrl: './adding-data.component.html',
  styleUrls: ['./adding-data.component.css']
})
export class AddingDataComponent{
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
  address: any
  lat: any;
  lng;
  urlLogo: any= "../../assets/imgs/PinHome icon.png";
  urlGallery = "../../assets/imgs/default image/default image for uploads.jpg";
  emailAdd;
  AboutOrg;
  select;
  price;
  state;
  urlGallery1 =  "../../assets/imgs/default image/default image for uploads.jpg";
  urlGallery2 = "../../assets/imgs/default image/default image for uploads.jpg";
  city:any;

  constructor( private router: Router, private cdRef: ChangeDetectorRef, private _ngZone: NgZone) {

  }
  ngOnInit() {
   
}

  initMap(address) {

    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
      
      if (status == google.maps.GeocoderStatus.OK) {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
      }
      let myLatLng = { lat: this.latitude, lng: this.longitude };
      this.objectArray = "test"
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: myLatLng,
        disableDefaultUI: true,
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8ec3b9"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1a3646"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#4b6878"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#64779e"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#4b6878"
              }
            ]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#334e87"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#023e58"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#283d6a"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#6f9ba5"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#023e58"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#3C7680"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#304a7d"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#98a5be"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#2c6675"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#255763"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#b0d5ce"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#023e58"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#98a5be"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#283d6a"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#3a4762"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#0e1626"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#4e6d70"
              }
            ]
          }
        ],

        // mapTypeId: 'terrain'
      });
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
      });
    })
  
  }

  change(value){
    // this.cdRef.detectChanges();
    console.log("changing");
    this.contacts= value.length > 10 ? value.substring(0,1) : value;

    if(value == 0){
      console.log("the val");
      
    }
    
  }

  scroll(event){
    console.log("scrolling");
    
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
  InsertPicture(event: any) {
    this._ngZone.run(() =>{
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.urlCover = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.coverPhoto = "Choose another cover photo"
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
      this.logoPhoto = "Choose a different logo";
    }
  })
  }
  pic1(event: any) {
    alert('me')
    this._ngZone.run(() =>{
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.urlGallery = event.target.result;
        console.log(this.urlGallery);
        
      }
      reader.readAsDataURL(event.target.files[0]);
      this.galleryupload = "Upload More"
    }
  })
  }
  
  pic2(event: any) {
    this._ngZone.run(() =>{
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.urlGallery1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.galleryupload = "Upload More"
    }
  })
  }

  pic3(event: any) {
    this._ngZone.run(() =>{
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.urlGallery2 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.galleryupload = "Upload More"
    }
  })
  }


  AddingData(event) {
    firebase.auth().onAuthStateChanged(user =>{
      this.getcoo(this.OrganizationAdress).then((data: any) => {
        this.long = data.lat;
        firebase.database().ref('Brunches/' + user.uid + '/').push({
          OrganizationName: this.name,
          OrganizationAdress: this.OrganizationAdress,
          ContactDetails:this.contacts,
          Email: this.emailAdd,
          Url: this.urlCover,
          Logo:this.urlLogo,
          longitude: data.lng,
          city : data.city,
          latitude: data.lat
        });
        // alerter[0].style.top = (mes/1.5) + "px";
        // alerter[0].style.left = "50%"; 

        // this.message = "Your information has been added."
        this.emailAdd = "";
        this.select = "";
        this.OrganizationAdress = "";
        this.name = "";
        this.urlCover = "";
        this.contacts = "";

        alert('data added')
        console.log(this.OrganizationAdress)
      })
    })
    }


  dismissAlert() {
    let alerter = document.getElementsByClassName('customAlert') as HTMLCollectionOf<HTMLElement>;
    alerter[0].style.left = "-100%";
    this.message = "";
  }

  goToMap(){
    this.router.navigate(['/landing-page'])
  }
  goToProfile(){
    this.router.navigate(['/profile'])
  }
}