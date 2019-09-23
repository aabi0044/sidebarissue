import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import * as app from 'firebase';
// Import firebase to fix temporary bug in AngularFire

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  token;
  constructor(  
    public afs: AngularFirestore,
    private platform: Platform,
    private afMessaging: AngularFireMessaging,
    private fun: AngularFireFunctions,
    private toastController: ToastController) {
      try {
        const _messaging = app.messaging();
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      } catch(e){
        console.log(e);
      }

    }
    getPermission(): Observable<any>  {
      return this.afMessaging.requestToken.pipe(
        tap(token => (this.token = token))
        
      )
    }
    showMessages(): Observable<any> {
      return this.afMessaging.messages.pipe(
        tap(msg => {
          const body: any = (msg as any).notification.body;
          this.makeToast(body);
        })
      );
    }
   
    async makeToast(message) {
      const toast = await this.toastController.create({
        message,
        duration: 5000,
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'dismiss'
      });
      toast.present();
    }
    // getPermission(): Observable<any>  {
    //   return this.afMessaging.requestToken.pipe(
    //     tap(token => (this.token = token))
    //   )
    // }
    
    // showMessages(): Observable<any> {
    //   return this.afMessaging.messages.pipe(
    //     tap(msg => {
    //       const body: any = (msg as any).notification.body;
    //       this.makeToast(body);
    //     })
    //   );
    // }
    sub(topic) {
      alert(topic)
      this.fun
        .httpsCallable('subscribeToTopic')({ topic,token:this.token })
        .pipe(tap(_ => this.makeToast(`subscribed to ${topic}`)))
        .subscribe();
    }
    
    // unsub(topic) {
    //   this.fun
    //     .httpsCallable('unsubscribeFromTopic')({ topic, token: this.token })
    //     .pipe(tap(_ => this.makeToast(`unsubscribed from ${topic}`)))
    //     .subscribe();
    // }





  
    // async getToken() {

    //   let token;
    
    //   if (this.platform.is('android')) {
    //     token = await this.firebaseNative.getToken()
    //   } 
    
    //   if (this.platform.is('ios')) {
    //     token = await this.firebaseNative.getToken();
    //     await this.firebaseNative.grantPermission();
    //   } 
      
    //   return this.saveTokenToFirestore(token)
    // }
    // private saveTokenToFirestore(token) {
    //   if (!token) return;
    
    //   const devicesRef = this.afs.collection('devices')
    
    //   const docData = { 
    //     token,
    //     userId: 'testUser',
    //   }
    
    //   return devicesRef.doc(token).set(docData)
    // }
    // listenToNotifications() {
    //   return this.firebaseNative.onNotificationOpen()
    // }
}
