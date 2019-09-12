import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading: any;
  constructor(
    private router: Router,
    private fb: Facebook,
    public loadingCtrl: LoadingController,
    private fireAuth: AngularFireAuth,
    private auth:AuthService
  ) {

  }

  async ngOnInit() {
    this.loading = await this.loadingCtrl.create({
      message: 'Connecting ...'
    });
  }


  async presentLoading(loading) {
    await loading.present();
  }


  async login() {

    this.fb.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) => {
  
      const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(res.authResponse.accessToken);
console.log(facebookCredential);
        // this.auth.facebookLogin(facebookCredential)
        // .then( success => { 
      
        //   let data = {
        //     email: success.user.email,
        //     password: '',
        //     type: 'facebook',
        //     dob: '',
        //     status: 'inactive'
        //   };
      
        // }, err =>{
        
        //   alert('Failed To Login.');
        // });

    },err =>{
      alert('Failed To Login.');
    });

    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }
  onLoginSuccess(res: FacebookLoginResponse) {
    // const { token, secret } = res;
    const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    this.fireAuth.auth.signInWithCredential(credential)
      .then((response) => {
        this.router.navigate(["/profile"]);
        this.loading.dismiss();
      })

  }
  onLoginError(err) {
    console.log(err);
  }
}
