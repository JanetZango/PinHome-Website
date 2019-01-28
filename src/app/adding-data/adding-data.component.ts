import { Component, OnInit, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { promise, Capability } from 'protractor';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from'@angular/router';
declare var google;
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-adding-data',
  templateUrl: './adding-data.component.html',
  styleUrls: ['./adding-data.component.css']
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
  address: any
  lat: any;
  lng;
  urlLogo: any;
  urlGallery = undefined;
  emailAdd;
  AboutOrg;
  select;
  price;
  objectArray = new Array();;
  homelist: AngularFireList<any>;
  items: Observable<any[]>;
  state;
  urlGallery1 =  undefined;
  urlGallery2 = undefined;
  city:any;

  constructor(public db: AngularFireDatabase, private authen : AngularFireAuth, private router: Router, private cdRef: ChangeDetectorRef, private _ngZone: NgZone) {
    this._ngZone.run(() =>{
    this.homelist = db.list('messages');
    this.items = this.homelist.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.authen.auth.onAuthStateChanged(user =>{
      console.log(user)
      if (user){
        this.state = 1;

        this.router.navigate(['/adding-data'])
      }
      else{
        console.log('no user')
        this.state = 0;
        this.router.navigate(['/sign-in'])
      }
     });
    })
  }

  initMap(address) {
    this._ngZone.run(() =>{
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
      
      if (status == google.maps.GeocoderStatus.OK) {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
      }
      let myLatLng = { lat: this.latitude, lng: this.longitude };
      this.objectArray = "test"
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: myLatLng,
        // mapTypeId: 'terrain'
      });
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
      });
    })
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
  InsertGallery(event: any) {
    this._ngZone.run(() =>{
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.urlGallery = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.galleryupload = "Upload More"
    }
  })
  }
  InsertGallery1(event: any) {
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
  InsertGallery2(event: any) {
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
    this._ngZone.run(() =>{
    let emptySpace = document.getElementById("orgName");
    let emptySpace1 = document.getElementById("orgContacts");
    let emptySpace2 = document.getElementById("theEmail");
    let emptySpace3 = document.getElementById("theAddress");
    let emptySpace4 = document.getElementById("about");
    let emptySpace5 = document.getElementById("selector");
    let emptySpace6 = document.getElementById("myLogo");

    let alerter = document.getElementsByClassName('customAlert') as HTMLCollectionOf<HTMLElement>;
    let mes = window.innerHeight;
    console.log(this.select);
    if (this.name == undefined) {
      emptySpace.style.boxShadow = "0 0 5px red"
      this.message = "Please enter the name of your organization";
    }
    else if (this.contacts == undefined) {

      emptySpace1.style.boxShadow = "0 0 5px red";
      this.message = "Please enter your organisation's phone";
    }
    else if (this.emailAdd == undefined) {
      // alerter[0].style.top = (mes/1.5) + "px";
      // alerter[0].style.left = "50%"; 


      emptySpace2.style.boxShadow = "0 0 5px red";
      this.message = "Please enter the email Address of your organization";
    }
    else if (this.OrganizationAdress == undefined) {
      // alerter[0].style.top = (mes/1.5) + "px";
      // alerter[0].style.left = "2.3%"; 


      emptySpace3.style.boxShadow = "0 0 5px red";
      this.message = "Please enter the Physical Address of your organization";
    }
    else if (this.AboutOrg == undefined) {
      // alerter[0].style.top = (mes/1.5) + "px";
      // alerter[0].style.left = "2.3%"; 


      emptySpace4.style.boxShadow = "0 0 5px red";
      this.message = "Please enter the description of your organization";
    }
    else if (this.select == undefined) {
      // alerter[0].style.top = (mes/1.5) + "px";
      // alerter[0].style.left = "2.3%"; 


      emptySpace5.style.boxShadow = "0 0 5px red";
      this.message = "Please select the category for your organization";
    }
    else if (this.logoPhoto != "Choose a different logo") {
      // alerter[0].style.top = (mes/1.5) + "px";
      // alerter[0].style.left = "2.3%"; 


      emptySpace6.style.boxShadow = "0 0 5px red";
      this.message = "Please upload the logo of your organization";
    }
  else if (this.urlGallery == undefined || this.urlGallery1 == undefined || this.urlGallery2 == undefined){
    this.message = "Please upload at least 3 Gallery pictures";
  }
  else if(this.contacts.length  < 10|| this.contacts.length > 10){
    this.message = "Phone number not complete";
  }
  
    else {
      this.getcoo(this.OrganizationAdress).then((data: any) => {
        this.long = data.lat;
        this.homelist = this.db.list('OrganizationList');
        this.homelist.push({
          OrganizationName: this.name,
          OrganizationAdress: this.OrganizationAdress,
          ContactDetails: "0" + this.contacts,
          Email: this.emailAdd,
          AboutOrg: this.AboutOrg,
          Category: this.select,
          Url: this.urlCover,
          Logo:this.urlLogo,
          Gallery:this.urlGallery,
          Gallery1:this.urlGallery1,
          Gallery2:this.urlGallery2,
          longitude: data.lng,
          city : data.city,
          latitude: data.lat
        });
        alerter[0].style.top = (mes/1.5) + "px";
        alerter[0].style.left = "50%"; 

        this.message = "Your information has been added."
        this.emailAdd = "";
        this.AboutOrg = "";
        this.select = "";
        this.OrganizationAdress = "";
        this.name = "";
        this.urlGallery = "";
        this.urlGallery1 = "";
        this.urlGallery2 = "";
        this.urlCover = "";
        this.urlLogo = "";
        this.contacts = "";
      })
    }

    if (this.name != undefined) {
      emptySpace.style.boxShadow = "0 0 5px transparent";
    }
    if (this.contacts != undefined || this.contacts != null) {
      emptySpace1.style.boxShadow = "0 0 5px transparent";
    }
    if (this.emailAdd != undefined) {
      emptySpace2.style.boxShadow = "0 0 5px transparent";
    }
    if (this.OrganizationAdress == undefined ||this.OrganizationAdress == " " || this.OrganizationAdress == null) {
      emptySpace3.style.boxShadow = "0 0 5px transparent";
    }
    if (this.AboutOrg != undefined) {
      emptySpace4.style.boxShadow = "0 0 5px transparent";
    }
    if (this.select == undefined) {
      emptySpace5.style.boxShadow = "0 0 5px transparent";
    }
    if (this.logoPhoto == "Choose a different logo") {
      emptySpace6.style.boxShadow = "0 0 5px transparent";
    }

    alerter[0].style.top = (mes / 1.5) + "px";
    alerter[0].style.left = "50%";
    alerter[0].style.transform = "translateX(-54%)"
  })
  }

  dismissAlert() {
    let alerter = document.getElementsByClassName('customAlert') as HTMLCollectionOf<HTMLElement>;
    alerter[0].style.left = "-100%";
    this.message = "";
  }
}