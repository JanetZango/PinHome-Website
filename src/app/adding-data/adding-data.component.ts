import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms' 
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
declare var google;
@Component({
  selector: 'app-adding-data',
  templateUrl: './adding-data.component.html',
  styleUrls: ['./adding-data.component.css']
})
export class AddingDataComponent {
  coverPhoto="Upload Cover Photo";
  logoPhoto="Upload Logo";
  galleryupload="Upload Images";
  long;
  latitude;
  name;
  urlCover="../../assets/imgs/default-cover.jpg";
  organization;
  contacts;
  message;
  OrganizationAdress;
  address: any
  lat: any;
  lng;
  urlLogo: any;
  urlGallery: any;
  emailAdd;
  AboutOrg;
  select;
  price;
  objectArray = new Array();;
  homelist: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(public db: AngularFireDatabase) {
    this.homelist = db.list('messages');
    this.items = this.homelist.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }
  initMap(address) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
      }
      console.log(this.longitude, this.latitude);
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
  }
  getcoo(address) {
    return new Promise((accpt, rej) => {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          this.latitude = results[0].geometry.location.lat();
          this.longitude = results[0].geometry.location.lng();
          let position = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          }
          accpt(position)
        }
      });
    })
  }
  InsertPicture(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.urlCover = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.coverPhoto = "Choose another cover photo"
    }
  }
  InsertLogo(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.urlLogo = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.logoPhoto ="Choose a different logo";
    }
    
  }
  InsertGallery(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.urlGallery = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.galleryupload="Upload More"
    }
  }
  AddingData(event) {
    
    let alerter = document.getElementsByClassName('customAlert') as HTMLCollectionOf <HTMLElement>;
    let h = window.innerHeight;
    console.log(this.select);
  if (this.name == undefined){
  this.message = "Please enter the name of your organization";
  }
  else if (this.contacts == undefined){
    this.message = "Please enter the contact details of your organization";
  }
  else if (this.emailAdd == undefined){
    this.message = "Please enter the email Address of your organization";
  }
  else if (this.OrganizationAdress == undefined){
    this.message = "Please enter the Physical Address of your organization";
  }
  else if (this.AboutOrg == undefined){
    this.message = "Please enter the description of your organization";
  }
  else if (this.select == undefined){
    this.message = "Please select the type of your organization";
  }
  else if (this.logoPhoto !="Choose a different logo"){
    this.message = "Please upload the logo of your organization";
  }
  else {
    this.getcoo(this.OrganizationAdress).then((data: any) => {
      this.long = data.lat;
      this.homelist = this.db.list('OrganizationList');
      this.homelist.push({
        OrganizationName: this.name,
        OrganizationAdress: this.OrganizationAdress,
        ContactDetails: this.contacts,
        Email: this.emailAdd,
        AboutOrg: this.AboutOrg,
        //Price: price,
        Category: this.select,
        Url: this.urlCover,
        longitude: data.lng,
        latitude: data.lat
      });
      this.message = "your data has been added"
    })
  }

    alerter[0].style.top = (h/1.5) + "px";
    alerter[0].style.left = "0"; 
  }

  dismissAlert(){
    let alerter = document.getElementsByClassName('customAlert') as HTMLCollectionOf <HTMLElement>;
    alerter[0].style.left = "-100%";

  }
}