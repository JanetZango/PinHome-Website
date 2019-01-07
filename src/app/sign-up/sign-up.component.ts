import { Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from'@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userRef: AngularFireList<any>;
  userId;
  dbPath;

  constructor(private authen : AngularFireAuth,public db: AngularFireDatabase, public router : Router) { }

  ngOnInit() {
  }

  register (fName, sName,orgName,email,mobile,tel,password,Confirm){
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
            downloadurl:'../assets/imgs/Dp.jpg',
            Telephone:tel});   
            this.router.navigate(['/adding-data'])
            alert('You have successfully logged in')
          })
          }, Error =>{
            alert(Error.message)
            })
  }
}
