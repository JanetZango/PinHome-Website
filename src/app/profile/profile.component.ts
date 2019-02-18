import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { EINPROGRESS } from 'constants';
import { userInfo } from 'os';
import { log } from 'util';
import { timeout } from 'q';

import swal from 'sweetalert';
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
  city1
  url1;
  tel1;
  logo;
  address;
  email1;
  cat;
  brunchesArr = [];
  mail;
  profileArr = [];
  clickState = 0;
  name1;
  state = 0;
  key;
  alertMessage;
  urlGallery1 =  "../../assets/imgs/default image/default image for uploads.jpg";
  galleryupload: string;
  imagesArr = [];
  gallery;
  v = 0;

   
  constructor(private router: Router, private _ngZone: NgZone) {
    this.getDetails().then((data: any) => {
      this.name = data.name;
      this.desc = data.desc;
      this.url = data.img;
      this.logo = data.logo;
      this.tel = data.tel;
      this.city = data.city;
      this.cat = data.cat,
      this.email = data.email,
      this.key =  data.key

    })

      this.getGallery()
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

  getDetails(){
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
              console.log(keys[0])
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
  assignUserID(id) {
    this.userId = id
  }

  edit() {
    if(this.email == ""){
      this.alertMessage = "Please enter the brnch's email"

    }
    else if(this.tel > 999999999 || this.tel < 100000000){
      this.alertMessage = "Please enter the branch's Phone number"

    }
    if(this.desc == ""){
      this.alertMessage = "Please make sure that the description field is not empty."
    }
    else{
    // if (this.clickState == 0) {
    //   firebase.database().ref('Brunches/' + this.userId + '/' + this.key + '/').update({
    //     email: this.email,
    //     desc: this.desc,
    //     Telphone: this.tel
    //   },Error=>{
    //     this.alertMessage = Error.message
    //   });
    // }
    // else {
      firebase.database().ref('Brunches/' + this.userId + '/' + this.key + '/').update({
        email: this.email,
        desc: this.desc,
        Telphone: this.tel
      },Error=>{
        this.alertMessage = Error.message
      });
    // }
       
    alert("updated")

    }
    
    alert(this.alertMessage)

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
    console.log(x);
    
    this.name1 = x.OrganizationName
    this.tel1 = x.ContactDetails;
    this.city1 = x.city;
    this.email1 = x.Email;
    this.url1 = x.Url;
    this.showEdit();
  }

  signOut(){
    swal({
      title: "Confirm.",
      text: "Click OK to sign out.",
      icon: "warning",
      // buttons: true,
      dangerMode: true,
    }).then((leave) => {
      if (leave) {
        this.router.navigate(['/sign-in'])
      } else {
        // swal("Your imaginary file is safe!");
      }
    });

    
    
 }
 profile(){
  this.router.navigate(['/profile'])
 }
 goToMap(){
  this.router.navigate(['/landing-page']);
 }
 dismissEdit(){
   var editor = document.getElementsByClassName("overrall") as HTMLCollectionOf <HTMLElement>;

   editor[0].style.display = "none";
 }
 showEdit(){
  var editor = document.getElementsByClassName("overrall") as HTMLCollectionOf <HTMLElement>;

  editor[0].style.display = "block";
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

openUploader(){
  var uploader = document.getElementsByClassName("forUploading") as HTMLCollectionOf <HTMLElement>;

  uploader[0].style.display = "block"
}
dismissUploader(){
  var uploader = document.getElementsByClassName("forUploading") as HTMLCollectionOf <HTMLElement>;

  uploader[0].style.display = "none"

}
getImages(event:any) {

  
  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.urlGallery1 = event.target.result;
      console.log(this.urlGallery1);
      var user = firebase.auth().currentUser.uid
      console.log(user);
     firebase.database().ref('Gallery/' + user + '/').push({
       GalUrl: this.urlGallery1})
       this.getGallery()
    this.dismissUploader();
      }, Error=>{
       alert(Error)
     }
    reader.readAsDataURL(event.target.files[0]);
    this.galleryupload = "Upload More"
  }
}

closeDIV(){
  var x = document.getElementsByClassName("overlay") as HTMLCollectionOf <HTMLElement>;
  var bg = document.getElementsByClassName("cont") as HTMLCollectionOf <HTMLElement>;
  var imgs = document.getElementsByClassName("gallery")  as HTMLCollectionOf <HTMLElement>;
  imgs[0].style.filter = "blur(0)";
  
  bg[0].style.filter = "blur(0)"
  x[0].style.opacity="0"
  setTimeout(() => {
    x[0].style.display ="none"
  }, 300);
}
showDIV(){
  
  var x = document.getElementsByClassName("overlay") as HTMLCollectionOf <HTMLElement>;
  var bg = document.getElementsByClassName("cont") as HTMLCollectionOf <HTMLElement>;
  var imgs = document.getElementsByClassName("gallery")  as HTMLCollectionOf <HTMLElement>;

  x[0].style.opacity="1"
  x[0].style.display ="block"
  bg[0].style.filter = "blur(6px)";
  imgs[0].style.filter = "blur(6px)";
}
showGal(){
  var y = document.getElementsByClassName("gallery") as HTMLCollectionOf <HTMLElement>;
  var x = document.getElementsByClassName("adder") as HTMLCollectionOf <HTMLElement>;
  var z = document.getElementsByClassName("array") as HTMLCollectionOf <HTMLElement>;
  
  

  if(this.v == 0){
    
    y[0].style.right= "10px";
    z[0].style.opacity = "1"
    setTimeout(() => {
      x[0].style.display = "block"
    }, 300);
    this.v = 1
  }
  else{
    
    // x[0].style.display = "none"
    y[0].style.right= "-240px";
    z[0].style.opacity = "0"
    
    setTimeout(() => {
      x[0].style.display = "none"
    }, 300);
    this.v = 0
  }


}

}
