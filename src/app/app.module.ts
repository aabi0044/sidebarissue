import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { Firebase } from '@ionic-native/firebase/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.fire),
    AngularFireAuthModule,
    FormsModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireMessagingModule,
    AngularFireFunctionsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    Camera,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
