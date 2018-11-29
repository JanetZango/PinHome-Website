import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userRef: AngularFireList<any>;
  userId;
  dbPath;

  constructor(private authen : AngularFireAuth,public db: AngularFireDatabase) { }

  ngOnInit() {
  }

  register (fName, sName,orgName,email,mobile,tel,password,Confirm){
    return new Promise ((accpt, rej)=>{
      this.authen.auth.createUserWithEmailAndPassword(email,password).then(() =>{
        this.authen.authState.subscribe(data =>{
          this.userId =  data.uid;
          this.dbPath =  'Websiteprofiles/' + data.uid; 
          this.userRef = this.db.list(this.dbPath);
          this.userRef.push({
            Firstname: fName,
            Lastname: sName,
            OrganisationName: orgName,
            Mobile: mobile,
            Telephone:tel});   
          })},
          error => 
          {
           rej(error.message)
           
          })
    })
 
  }
}