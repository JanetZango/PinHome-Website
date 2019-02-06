import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
declare var firebase;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
  profileArr = [];
  clickState = 0;
  name1;;
  constructor(private router: Router, private _ngZone: NgZone) {
    this.getDetails().then((data: any) => {
      this.name = data.name;
      this.desc = data.desc;
      this.url = data.img;
      this.logo = data.logo;
      this.tel = data.tel;
      this.city = data.city;
      this.cat = data.cat,
        this.email = data.email
    })
    this.getBrunches().then((data: any) => {
      console.log(data);
      var keys = data.keys;
      var temp = data.data;
      for (var x = 0; x < keys.length; x++) {
        console.log(keys[x])
        this.brunchesArr.push(temp[keys[x]]);
        console.log(this.brunchesArr);
        
      }

    })

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
              let obj = {
                name: details[keys[0]].OrganisationName,
                img: details[keys[0]].Url,
                desc: details[keys[0]].desc,
                logo: details[keys[0]].Logo,
                tel: details[keys[0]].Telephone,
                city: details[keys[0]].city,
                cat: details[keys[0]].category,
                email: user.email
              }
              accpt(obj)
            }
          })
        } else {
          // No user is signed in.
        }
      })
    })
  }

  ngOnInit() {
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
  assignUserID(id) {
    this.userId = id
  }

  edit() {
    if (this.clickState == 0) {
      console.log(this.profileArr[0].key);
      firebase.database().ref('Websiteprofiles/' + this.userId + '/').update(this.profileArr[0].key, {
        email: this.email,
        desc: this.desc,
        Telphone: this.tel
      });
    }
    else {
      console.log(this.profileArr[0].key);
      firebase.database().ref('Brunches/' + this.userId + '/').update(this.brunchesArr[0].key, {
        email: this.email,
        desc: this.desc,
        Telphone: this.tel
      });
    }

  }


  assignUid(userId) {
    this.userId = userId
  }
  assignEmail(mail) {
    this.mail = mail
  }

  addBrunch() {
    this.router.navigate(['/adding-data']);
  }



  assignBrunch(x) {
    this.brunchesArr = x;
  }

  showinfo(x) {
    this.clickState = 1;
    this.name = x.OrganizationName
    this.tel = x.ContactDetails;
    this.city = x.city;
    this.email = x.Email;
    this.logo = x.Url;
  }

  signOut(){
    this.router.navigate(['/sign-in'])
}

}