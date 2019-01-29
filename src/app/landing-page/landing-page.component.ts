import { Component, OnInit } from '@angular/core';

import {SlideshowModule} from 'ng-simple-slideshow';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  myImages=["../../assets/imgs/dummy data/1.JPG", "../../assets/imgs/dummy data/2.JPG", "../../assets/imgs/dummy data/3.JPG",
  "../../assets/imgs/dummy data/4.JPG", "../../assets/imgs/dummy data/5.JPG"
];

  constructor(private slide: SlideshowModule) { }

  ngOnInit() {
  }

}
