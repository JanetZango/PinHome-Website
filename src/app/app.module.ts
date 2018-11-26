import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { routes } from './app.router';
import { AngularFireDatabaseModule } from 'angularfire2/database';



import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AddingDataComponent } from './adding-data/adding-data.component';


@NgModule({
  declarations: [
    AppComponent,
    AddingDataComponent,


  ],
  imports: [
    BrowserModule,
    routes,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }