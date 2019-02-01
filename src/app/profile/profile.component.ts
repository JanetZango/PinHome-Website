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
  brunchDetails : AngularFireList<any>
 Orgs: Observable<any[]>
 brunches: Observable<any[]>
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
brunchesArr = [];
mail;

  constructor(private authen : AngularFireAuth, private db: AngularFireDatabase,private router: Router) { }

  ngOnInit() {
    this.authen.auth.onAuthStateChanged(data =>{
      this.userId =  data.uid;
      this.assignUid(this.userId);
      console.log(data.uid)
      this.email = data.email;
      this.assignEmail(this.email)
      console.log(this.email)
      this.getBrunches()
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
  assignUid(userId){
    this.userId = userId
  }
  assignEmail(mail){
    this.mail =  mail
  }
  Update(){
    this.brunchDetails=  this.userId;
    // if ()
    // this.brunchDetails.update()
  }
  addBrunch(){
    
    this.router.navigate(['/adding-data']);
  }

  getBrunches(){
    return new Promise ((accpt, rej) =>{
     var dbPath =  'Brunches/' + this.userId + '/'; 
      this.brunchDetails = this.db.list(dbPath);
      this.brunches = this.brunchDetails.snapshotChanges().pipe(
      map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
      this.brunches.subscribe(x =>{
        this.brunchesArr = x;
        console.log(x);
        
      })
  
    })
  }

  showinfo( x){
    this.name = x.OrganizationName
    this.desc=x.AboutOrg;
    this.tel =x.ContactDetails;
    this.city =x.city;
    this.cat = x.Category
    this.email =  x.Email;
    this.logo = x.Url;
     
  }

}