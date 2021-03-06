import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FcmService } from './services/fcm/fcm.service';
import { ToastController } from '@ionic/angular';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  pages = [
    {
      title: 'Home',
      url: '/sidemenu/home',
      icon: 'home'
    },
    {
      title: 'About us',
      url: '/sidemenu/aboutus',
      icon: 'home'
    },
    {
      title: 'Instructions',
      url: '/sidemenu/instructions',
      icon: 'home'
    },
    {
      title: 'Lottery',
      url: '/sidemenu/lottery',
      icon: 'home'
    },
    {
      title: 'Contact',
      url: '/sidemenu/contact',
      icon: 'home'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    private toastCtrl: ToastController,
  ) {
    platform.ready().then(() => {

      // Get a FCM token
      fcm.getToken()

      // Listen to incoming messages
      fcm.listenToNotifications().pipe(
        tap((msg:any) => {
          // show a toast
     this.presentToast(msg.body)

        })
      )
      .subscribe()
    });
  }
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //     this.fcm.showMessages().subscribe();
  //   });
  // }
}
