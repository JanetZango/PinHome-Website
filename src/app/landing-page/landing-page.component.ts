import { Component, OnInit } from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';
import {SlideshowModule} from 'ng-simple-slideshow';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  myImages=["../../assets/imgs/dummy data/1.JPG", "../../assets/imgs/dummy data/2.JPG", "../../assets/imgs/dummy data/3.JPG",
  "../../assets/imgs/dummy data/4.JPG", "../../assets/imgs/dummy data/5.JPG"
];



  constructor(private slide: SlideshowModule, private authState: AngularFireAuth, public router: Router) { }

  ngOnInit() {
  }

  getStarted(){
    // this decides if you are online or not


    this.authState.auth.onAuthStateChanged(user =>{
      console.log(user)
      if (user){

        this.router.navigate(['/adding-data']);
      }
      else{
        console.log('no user')

        this.router.navigate(['/sign-in']);

      }
     });

  }

}
