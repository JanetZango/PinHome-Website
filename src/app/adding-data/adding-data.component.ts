import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';






@Component({
  selector: 'app-adding-data',
  templateUrl: './adding-data.component.html',
  styleUrls: ['./adding-data.component.css']
})
export class AddingDataComponent {
  url;
  organization;
  contactDetails;
  address;

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


  InsertPicture(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  AddingData(organization, contactDetails, address, select, email, price) {
    this.homelist = this.db.list('OrganizationList');
    this.homelist.push({
      OrganizationName: organization,
      OrganizationAdress: contactDetails,
      ContactDetails: address,
      Category: select,
      Url: this.url,
      Email: email,
      Price: price

    });

  }
 



}