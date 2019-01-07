import { Component } from '@angular/core';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: any;


  show(){
    alert('message');

    var greet = document.getElementsByClassName("greeting") as HTMLCollectionOf <HTMLElement>;

    greet[0].style.display = "none";
  }

 
}