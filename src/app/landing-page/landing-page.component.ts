import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
declare var google;
// import {SlideshowModule} from 'ng-simple-slideshow';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

 orgDetails: AngularFireList<any>;
 Orgs: Observable<any[]>
 key;
 dbPath
 email;
OrganizationKey;
organizationArr=[];
latestOrgs = [];
oldOrgs = [];

  myImages=["../../assets/imgs/dummy data/1.JPG", "../../assets/imgs/dummy data/2.JPG", "../../assets/imgs/dummy data/3.JPG",
  "../../assets/imgs/dummy data/4.JPG", "../../assets/imgs/dummy data/5.JPG"
];

  constructor(private authen : AngularFireAuth, private db: AngularFireDatabase,private _ngZone: NgZone) { }

  ngOnInit() {

    this.dbPath =  'OrganizationList'; 
    this.orgDetails= this.db.list(this.dbPath);
    console.log(this.orgDetails)
    this.Orgs = this.orgDetails.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.Orgs.subscribe(x =>{
     this.organizationArr= x;
     var totLength = x.length - 3;
     for (var i = 0; i < x.length; i++){
       if (i >= totLength){
          this.latestOrgs.push(this.organizationArr[i]);
       }
       else{
         this.oldOrgs.push(this.organizationArr[i])
       }
     }
     console.log(this.organizationArr)
    })


    this.initMap();
  }

  initMap() {

    this.dbPath =  'OrganizationList'; 
    this.orgDetails= this.db.list(this.dbPath);
    console.log(this.orgDetails)
    this.Orgs = this.orgDetails.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.Orgs.subscribe(x =>{
     this.organizationArr= x
     console.log(this.organizationArr)
    })
      setTimeout(() => {
   
        let myLatLng = { lat: this.organizationArr[0].latitude, lng: this.organizationArr[0].longitude };
          // this.objectArray = "test"
          let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 17,
            center: myLatLng,
            // mapTypeId: 'terrain'
          });
          for(var x=0; x<this.organizationArr.length;x++){
            console.log("inside");
            let myLatLng = { lat: this.organizationArr[x].latitude, lng: this.organizationArr[x].longitude };
          let marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title:  this.organizationArr[x].OrganizationName,
          });
        // })
        }
      }, 3000);
      
    
      console.log("at the end");
  // })
  }

}
