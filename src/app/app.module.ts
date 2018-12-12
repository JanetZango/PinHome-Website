import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { routes } from './app.router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';



import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AddingDataComponent } from './adding-data/adding-data.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { GreetingComponent } from './greeting/greeting.component';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    AddingDataComponent,
    SignUpComponent,
    SignInComponent,
    GreetingComponent,
    ProfileComponent,


  ],
  imports: [
    BrowserModule,
    routes,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }