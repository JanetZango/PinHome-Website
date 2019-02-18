import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FLAGS } from '@angular/core/src/render3/interfaces/view';
import { reject } from 'q';
import { PassThrough } from 'stream';


import swal from 'sweetalert';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

declare var google;
declare var firebase;
// import {SlideshowModule} from 'ng-simple-slideshow';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  key;
  proArr = [];
  dbPathdecideS
  email;
  OrganizationKey;
  organizationArr = [];
  latestOrgs = [];
  oldOrgs = [];
  profilePicture2 = "../../assets/imgs/custom alert/loading.gif";
  username2 = "Please wait...";
  temp
  keyss
  state = 0;
  i = 180;
  initially;
  tempArr = []

  images = ["assets/imgs/1.png", "assets/imgs/2.png", "assets/imgs/3.png", "assets/imgs/4.png", "assets/imgs/7.png", "assets/imgs/4.png", "assets/imgs/5.png", "assets/imgs/6.png"]
  url1;
  email1;
  city1;
  tel1;
  name1;
  name;
  clickState = 0;
  v = 0;
  desc = "Loading your organisation's description, please wait...";
  url
  logo
  tel
  city = "Loading your organisation's address";
  cat
  alertMessage;
  profileArr=[];
  imagesArr=[];
  brunchesArr=[];
  userId;
  displayProfileArr=[];
  constructor(private _ngZone: NgZone, private router: Router) {

    this.getDetails().then((data: any) => {
      console.log(data);
      this.username2 = data.name
      this.profilePicture2 = data.img
    })


    this.getDetails2().then((data: any) => {
      this.name = data.name;
      this.desc = data.desc;
      this.url = data.img;
      this.logo = data.logo;
      this.tel = data.tel;
      this.city = data.city;
      this.cat = data.cat,
      this.email = data.email,
      this.key =  data.key
      // this.displayProfileArr =data
      // console.log(this.displayProfileArr)
    })

      this.getGallery();
    this.getBrunches().then((data: any) => {
      console.log(data);
      this.assignKeys(data.keys)
      var keys = data.keys;
      var temp = data.data;
      for (var x = 0; x < keys.length; x++) {
        console.log(keys[x])
        this.brunchesArr.push(temp[keys[x]]);
        console.log(this.brunchesArr);
      }
    })

  }


  public setName(name) {
    this.username2 = name
  }

  getDetails() {
    return new Promise((accpt, reject) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          firebase.database().ref("Websiteprofiles/" + user.uid).on("value", (data: any) => {
            if (data.val() != null || data.val() != undefined) {
              let details = data.val()
              console.log(details)
              let keys = Object.keys(details)
              console.log(keys)
              this.username2 = details[keys[0]].OrganisationName
              this.profilePicture2 = details[keys[0]].Url
              let obj = {
                name: this.username2,
                img: this.profilePicture2
              }
              accpt(obj)
            }
          })
          // } else {
          // No user is signed in.
        }
      });
    })
  }

  ngOnInit() {
    firebase.database().ref("Websiteprofiles/").on("value", (data: any) => {
      if (data.val() != null || data.val() != undefined) {
        var DisplayData = data.val();
        var keys = Object.keys(DisplayData)
        for (var x = 0; x < keys.length; x++) {
          firebase.database().ref("Websiteprofiles/" + keys[x]).on("value", (data2: any) => {
            var orgs = data2.val();
            var keys2 = Object.keys(orgs)
            for (var i = 0; i < keys2.length; i++) {
              this.assignData(orgs[keys2[i]])
            }
          })
        }
      }
      this.initMap()
    })
  }
  addBrunch() {
    this.router.navigate(['/adding-data']);
  }
  assignData(x) {
    this.organizationArr.push(x)
  }

  userID;
  assignUserID(id) {
    this.userID = id;
  }
  initMap() {
    console.log(this.organizationArr)
    setTimeout(() => {
      let myLatLng = { lat: this.organizationArr[0].latitude, lng: this.organizationArr[0].longitude };
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
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



      });
      var indx = 0;

      for (var x = 0; x < this.organizationArr.length; x++) {
        if (this.organizationArr[x].Category == "Orphanage")
          indx = 1;
        else if (this.organizationArr[x].Category == "Disability")
          indx = 2;
        else if (this.organizationArr[x].Category == "old age")
          indx = 3;
        else if (this.organizationArr[x].Category == "theraphy")
          indx = 4;
        else if (this.organizationArr[x].Category == "Psychiatric")
          indx = 5;
        else if (this.organizationArr[x].Category == "social centre")
          indx = 6;
        else if (this.organizationArr[x].Category == "Rehab")
          indx = 7;

        console.log("inside");
        let myLatLng = { lat: this.organizationArr[x].latitude, lng: this.organizationArr[x].longitude };
        console.log(myLatLng);

        let marker = new google.maps.Marker({
          position: myLatLng,
          icon: this.images[indx],
          size: { width: 5, height: 5 },
          map: map,
          title: this.organizationArr[x].OrganizationName,

        });



        let infowindow = new google.maps.InfoWindow({

          content: '<div style="width: 400px; transition: 300ms;"><b>' + this.organizationArr[x].OrganisationName + '</b><div style="display: flex; padding-top: 10px;">' +
            '<img style="height: 100px; width: 100px; object-fit: cober; border-radius: 50px;" src=' + this.organizationArr[x].Url + '>' + '<p style="padding-left: 10px;padding-right: 10px">' +
            this.organizationArr[x].desc + '</p><br>' + '<br></div>'


        });


        marker.addListener('click', function () {
          infowindow.open(map, marker);
          map.setZoom(13);
          map.setCenter(marker.getPosition());
        });
      }
    }, 3000);

    console.log("at the end");
  }

  getStarted() {
    // this decides if you are online or not
  }

  decideState() {
    if (this.state == 0) {
      this.showSlide()
    }
    else {
      this.hideSlide()
    }

    console.log(this.state);

  }

  showSlide() {
    var blurMap = document.getElementById("map");
    let slider = document.getElementsByClassName("absolutely") as HTMLCollectionOf<HTMLElement>;
    let arrow = document.getElementsByClassName("clicker") as HTMLCollectionOf<HTMLElement>;

    // arrow[0].style.left = "48%";
    // arrow[0].style.transform = "translateX(-60%)";
    arrow[0].style.transform = "rotateZ(180deg)";
    // arrow[0].style.transform = "translateX(-50%)";
    slider[0].style.bottom = "0";
    blurMap.style.filter = "blur(3px)"
    this.state = 1;

  }
  hideSlide() {
    var blurMap = document.getElementById("map");
    let slider = document.getElementsByClassName("absolutely") as HTMLCollectionOf<HTMLElement>;
    let arrow = document.getElementsByClassName("clicker") as HTMLCollectionOf<HTMLElement>;

    // arrow[0].style.left = "48%";
    // arrow[0].style.transform = "translateX(-60%)";
    // arrow[0].style.transform = "rotateZ(0DEG)";
    slider[0].style.bottom = "-200px";
    arrow[0].style.transform = "rotateZ(0deg)"
    blurMap.style.filter = "blur(0px)"

    this.state = 0
  }

  toLeft() {
    var pusher = document.getElementById("push");
    let i = 160
    pusher.style.marginLeft = (this.initially) + i + "px"
  }

  move22() {
    return new Promise((accpt, rej) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          if (user.emailVerified == false) {
            user.sendEmailVerification()
            swal('please verify your email')
            accpt(0)
          }
          else {
            accpt(1)
          }
        }
      })
    })

  }

  gotToProfile() {
    this.move22().then((data: any) => {
      if (data == 1) {
        // this.router.navigate(['/profile']);
      }
    })
    // alert("clicked")
    var prof = document.getElementsByClassName("profOverlay") as HTMLCollectionOf<HTMLElement>;
    var blurMap = document.getElementById("map");
    blurMap.style.filter = "blur(6px)"

    prof[0].style.display = "block"
  }
  goToProfile() {
    // alert("clicked")
    var prof = document.getElementsByClassName("profOverlay") as HTMLCollectionOf<HTMLElement>;


    prof[0].style.display = "block"
  }

  closeDIV() {
    var x = document.getElementsByClassName("overlay") as HTMLCollectionOf<HTMLElement>;
    var bg = document.getElementsByClassName("cont") as HTMLCollectionOf<HTMLElement>;
    var imgs = document.getElementsByClassName("gallery") as HTMLCollectionOf<HTMLElement>;
    imgs[0].style.filter = "blur(0)";

    bg[0].style.filter = "blur(0)"
    x[0].style.opacity = "0"
    setTimeout(() => {
      x[0].style.display = "none"
    }, 300);
  }
  showDIV() {

    var x = document.getElementsByClassName("overlay") as HTMLCollectionOf<HTMLElement>;
    var bg = document.getElementsByClassName("cont") as HTMLCollectionOf<HTMLElement>;
    var imgs = document.getElementsByClassName("gallery") as HTMLCollectionOf<HTMLElement>;

    x[0].style.opacity = "1"
    x[0].style.display = "block"
    bg[0].style.filter = "blur(6px)";
    imgs[0].style.filter = "blur(6px)";

  }

  showinfo(x) {
    this.clickState = 1;
    console.log(x);

    this.name1 = x.OrganizationName
    this.tel1 = x.ContactDetails;
    this.city1 = x.city;
    this.email1 = x.Email;
    this.url1 = x.Url;
  }

  signOut() {
    swal({
      text: "Click OK to sign out.",
      icon: "warning",
      // buttons: true,
      dangerMode: true,
    }).then((leave) => {
      if (leave) {
        firebase.auth().signOut();
        this.router.navigate(['/sign-in'])
      };
    });



  }

  showGal() {
    var y = document.getElementsByClassName("gallery") as HTMLCollectionOf<HTMLElement>;
    var x = document.getElementsByClassName("adder") as HTMLCollectionOf<HTMLElement>;
    var z = document.getElementsByClassName("array") as HTMLCollectionOf<HTMLElement>;
    if (this.v == 0) {

      y[0].style.right = "10px";
      z[0].style.opacity = "1"
      setTimeout(() => {
        x[0].style.display = "block"
      }, 300);
      this.v = 1
    }
    else {
      // x[0].style.display = "none"
      y[0].style.right = "-240px";
      z[0].style.opacity = "0"

      // setTimeout(() => {
        x[0].style.display = "none"
      // }, 3);
      this.v = 0
    }


  }
  closeProfile() {
    // alert("clicked")
    var prof = document.getElementsByClassName("profOverlay") as HTMLCollectionOf<HTMLElement>;
    var blurMap = document.getElementById("map");
    var profil = document.getElementsByClassName("cont") as HTMLCollectionOf<HTMLElement>;
    blurMap.style.filter = "blur(0px)"
    // profil[0].style.animation ="disappear 300ms";
    

    setTimeout(() => {
      prof[0].style.display = "none";
    }, 700);
  }


  //
  displayData(v,i){
    this.clickState = 1;
    console.log(v);
    
    this.name1 = v.OrganizationName
    this.tel1 = v.ContactDetails;
    this.city1 = v.city;
    this.email1 = v.Email;
    this.url1 = v.Url;
    this.key = this.keyss[i]
    // this.showEdit();
    
    var x = document.getElementsByClassName("overlay") as HTMLCollectionOf <HTMLElement>;
    var bg = document.getElementsByClassName("cont") as HTMLCollectionOf <HTMLElement>;
    var imgs = document.getElementsByClassName("gallery")  as HTMLCollectionOf <HTMLElement>;
  
    x[0].style.opacity="1"
    x[0].style.display ="block"
    bg[0].style.filter = "blur(6px)";
    imgs[0].style.filter = "blur(6px)";
  }

  assignKeys(k){
    this.keyss =  k;
  }
  getDetails2(){
    return new Promise((accpt, reject) => {
    
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          firebase.database().ref("Websiteprofiles/" + user.uid).on("value", (data: any) => {
            if (data.val() != null || data.val() != undefined) {
              let details = data.val()
              console.log(details)
              let keys = Object.keys(details)
              let obj = {
                name: details[keys[0]].OrganisationName,
                img: details[keys[0]].Url,
                desc: details[keys[0]].desc,
                logo: details[keys[0]].Logo,
                tel: details[keys[0]].Telephone,
                city: details[keys[0]].city,
                cat: details[keys[0]].category,
                email: user.email,
                key:keys[0]
              }
              console.log(obj)
              accpt(obj)
            }
          })
        } else {
          // No user is signed in.
        }
      })
    })
  }
  

  getGallery(){
    console.log('getting gallery')
    this.retrieveGal().then((data:any) =>{
      this.imagesArr.length = 0;
      var keys = data.keys;
      var temp = data. detals;
      console.log(keys);
      console.log(temp);
      for (var x=0; x < keys.length; x++){
        this.imagesArr.push(temp[keys[x]])
      }
      console.log(this.imagesArr);
    })
  }


  retrieveGal(){
    return new Promise((accpt, rej) => {
      firebase.auth().onAuthStateChanged(function (user) {
        let dbPath = 'Gallery/' + user.uid;
        firebase.database().ref(dbPath).on("value", (data: any) => {
          let details = data.val();  
          let key = Object.keys(details)
            
             let obj={
              detals:details,
              keys : key
            }
            console.log(obj)
          accpt(obj)
        })
      })
    })
  }

  getBrunches() {
    return new Promise((accpt, rej) => {
      firebase.auth().onAuthStateChanged(function (user) {
        var dbPath = 'Brunches/' + user.uid + '/';
        firebase.database().ref(dbPath).on("value", (data: any) => {
          console.log(data.val());
          if (data.val() != null || data.val() != undefined) {
            var DisplayData = data.val();
            console.log(DisplayData);
            var keys = Object.keys(DisplayData)
            console.log(DisplayData)

            let obj = {
              data: DisplayData,
              keys: keys
            }
            accpt(obj)
          }
        })
      })
    })
  }

  assignArray(x) {
    this.profileArr = x;
  }

  assignData2(x) {
    this.brunchesArr.push(x)
    console.log(this.brunchesArr)
  }
  assignUserID2(id) {
    this.userId = id
  }


  edit() {
    console.log(this.keyss);
    
      if(this.email == ""){
        this.alertMessage = "Please enter the brnch's email"
  
      }
      else if(this.tel > 999999999 || this.tel < 100000000){
        this.alertMessage = "Please enter the branch's Phone number"
  
      }
      if(this.desc == ""){
        this.alertMessage = "Please make sure that the description field is not empty."
      }
      else {
        var user = firebase.auth().currentUser.uid
        firebase.database().ref('Brunches/' + user + '/' + this.key + '/').update({
           Email: this.email1,
           OrganizationName: this.name1,
           ContactDetails: this.tel1,
           OrganizationAdress:this.city1,
           Url:this.url1
  
        },Error=>{
          this.alertMessage = Error.message
        });
      // }
         
      alert("updated")
  
      }
      
      alert(this.alertMessage)
  
    }
  
}