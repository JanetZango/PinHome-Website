import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

declare var google;
// import {SlideshowModule} from 'ng-simple-slideshow';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  orgDetails: AngularFireList<any>;
  prodDetails: AngularFireList<any>;
  Orgs: Observable<any[]>
  profile : Observable<any[]>
  key;
  proArr = [];
  dbPath
  email;
  OrganizationKey;
  organizationArr = [];
  latestOrgs = [];
  oldOrgs = [];
  profilePicture = "../../assets/imgs/loading.gif";
  username = "Please wait...";

  state = 0;
  i = 180;
  initially;

  images = ["assets/imgs/1.png","assets/imgs/2.png","assets/imgs/3.png","assets/imgs/4.png","assets/imgs/7.png","assets/imgs/4.png","assets/imgs/5.png","assets/imgs/6.png" ]

  constructor(private authen: AngularFireAuth, private db: AngularFireDatabase, private _ngZone: NgZone, private router: Router) { }

  ngOnInit() {
    this.authen.auth.onAuthStateChanged(user =>{
    this.dbPath = 'Websiteprofiles/' + user.uid + '/';
    this.assignUserID(this.dbPath)
    this. prodDetails = this.db.list(this.dbPath);
    console.log(this. prodDetails)
    this.profile = this. prodDetails.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.profile.subscribe(x =>{
      this.username = x[0].OrganisationName
      this.profilePicture = x[0].Logo
      this.initMap();
    })
  })
    // this.dbPath = 'OrganizationList';
    // this.orgDetails = this.db.list(this.dbPath);
    // console.log(this.orgDetails)
    // this.Orgs = this.orgDetails.snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );


    // this.Orgs.subscribe(x => {
    //   this.organizationArr = x;
    //   var totLength = x.length - 3;
    //   for (var i = 0; i < x.length; i++) {
    //     if (i >= totLength) {
    //       this.latestOrgs.push(this.organizationArr[i]);
    //     }
    //     else {
    //       this.oldOrgs.push(this.organizationArr[i])
    //     }
    //   }
    //   console.log(this.organizationArr)
    // })
 
  }
userID;
assignUserID(id){
  this.userID = id;
}
  initMap() {
    this.dbPath =  this.userID
    this.orgDetails = this.db.list(this.dbPath);
    console.log(this.orgDetails)
    this.Orgs = this.orgDetails.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.Orgs.subscribe(x => {
      this.organizationArr = x
      console.log(this.organizationArr)
    })
    setTimeout(() => {
      

      let myLatLng = { lat: this.organizationArr[0].latitude, lng: this.organizationArr[0].longitude };
      // this.objectArray = "test"
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
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
        indx =  1;
        else if (this.organizationArr[x].Category == "Disability")
        indx =  2;
        else if (this.organizationArr[x].Category == "old age")
        indx =  3;
        else if (this.organizationArr[x].Category == "theraphy")
        indx =  4;
        else if (this.organizationArr[x].Category == "Psychiatric")
        indx =  5;
        else if (this.organizationArr[x].Category == "social centre")
        indx =  6;
        else if (this.organizationArr[x].Category == "Rehab")
        indx =  7;

        console.log("inside");
        let myLatLng = { lat: this.organizationArr[x].latitude, lng: this.organizationArr[x].longitude };
        let marker = new google.maps.Marker({
          position: myLatLng,
          icon:this.images[indx],
          size: { width: 5, height: 5 },
          map: map,
          title: this.organizationArr[x].OrganizationName,

        });

     

        let infowindow = new google.maps.InfoWindow({
          
          content:  '<div style="width: 400px; transition: 300ms;"><b>' + this.organizationArr[x].OrganizationName + '</b><div style="display: flex; padding-top: 10px;">' +
          '<img style="height: 100px; width: 100px; object-fit: cober; border-radius: 50px;" src=' +  this.organizationArr[x].Url + '>' + '<p style="padding-left: 10px;padding-right: 10px">' +
            this.organizationArr[x].AboutOrg+'</p><br>'+'<br></div>' 
            
          
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


    this.authen.auth.onAuthStateChanged(user => {
      console.log(user)
      if (user) {

        this.router.navigate(['/adding-data']);
      }
      else {
        console.log('no user')

        this.router.navigate(['/sign-in']);

      }
    });

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
    let slider = document.getElementsByClassName("absolutely") as HTMLCollectionOf<HTMLElement>;
    let arrow = document.getElementsByClassName("clicker") as HTMLCollectionOf<HTMLElement>;

    arrow[0].style.left = "48%";
    arrow[0].style.transform = "translateX(-60%)";
    arrow[0].style.transform = "rotateZ(180DEG)";
    slider[0].style.bottom = "0";

    this.state = 1;

  }
  hideSlide() {
    let slider = document.getElementsByClassName("absolutely") as HTMLCollectionOf<HTMLElement>;
    let arrow = document.getElementsByClassName("clicker") as HTMLCollectionOf<HTMLElement>;

    arrow[0].style.left = "48%";
    arrow[0].style.transform = "translateX(-60%)";
    arrow[0].style.transform = "rotateZ(0DEG)";
    slider[0].style.bottom = "-200px";

    this.state = 0
  }

  toLeft() {
    var pusher = document.getElementById("push");
    let i = 160
    pusher.style.marginLeft = (this.initially) + i + "px"
  }

  gotToProfile() {
    this.router.navigate(['/profile']);
  }
  goToProfile() {
    this.router.navigate(['/profile']);
  }

}
