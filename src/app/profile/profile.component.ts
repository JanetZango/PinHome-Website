import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  orgDetails: AngularFireList<any>;
 Orgs: Observable<any[]>
 userId;
 dbPath
 email;
 name;
 desc;
 category;
 city
 url;
 tel;
 logo;
 address;
 cat;


  constructor(private authen : AngularFireAuth, private db: AngularFireDatabase,private router: Router) { }

  ngOnInit() {
    this.authen.auth.onAuthStateChanged(data =>{
      this.userId =  data.uid;
      console.log(data.uid)
      this.email = data.email;
      console.log(this.email)
      this.dbPath =  'Websiteprofiles/' + this.userId + '/'; 
      this.orgDetails= this.db.list(this.dbPath);
      this.Orgs = this.orgDetails.snapshotChanges().pipe(
      map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
   this.Orgs.subscribe(x =>{
      this.name = x[0].OrganisationName
      this.desc=x[0].desc;
      this.url =x[0].Url;
      this.logo =x[0].Logo;
      this.tel =x[0].Telephone;
      this.city =x[0].city;
      this.cat = x[0].category
     




      console.log(x);
      
     })
    });
  
  }
  Update(){
    
  }
  addBrunch(){
    
    this.router.navigate(['/adding-data']);
  }



}