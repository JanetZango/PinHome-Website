import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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
  constructor(private authen : AngularFireAuth, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.authen.authState.subscribe(data =>{
      this.userId =  data.uid;
      console.log(data.uid)
      this.email = data.email;
      console.log(this.email)
      this.dbPath =  'Websiteprofiles/' + this.userId; 
      this.orgDetails= this.db.list(this.dbPath);
      this.Orgs = this.orgDetails.snapshotChanges().pipe(
      map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
     });
  }




}
