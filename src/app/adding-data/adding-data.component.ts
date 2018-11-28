import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
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
  urlCover="../../assets/imgs/default-cover.jpg";
  organization;
  contactDetails;
  address: any
  lat: any;
  lng;
  urlLogo: any;
  urlGallery: any;
  email;
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
      this.logoPhoto ="Choose another logo";
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
  AddingData(organization, address, contactDetails, email, AboutOrg, price, select) {
    this.getcoo(address).then((data: any) => {
      console.log(data.lat);
      this.long = data.lat;
      console.log(this.long);
      this.homelist = this.db.list('OrganizationList');
      this.homelist.push({
        OrganizationName: organization,
        OrganizationAdress: address,
        ContactDetails: contactDetails,
        Email: email,
        AboutOrg: AboutOrg,
        Price: price,
        Category: select,
        Url: this.urlCover,
        longitude: data.lng,
        latitude: data.lat
      });
 
    })
  }
}