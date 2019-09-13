import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import undefined = require('firebase/empty-import');

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
email;
password;
remember=false;
  loading: any;
  constructor(
    private router: Router,
    private fb: Facebook,
    public loadingCtrl: LoadingController,
    private fireAuth: AngularFireAuth,
    private auth:AuthService
  ) {
let a = localStorage.getItem('softemail');
let b= localStorage.getItem('softpassword');
console.log(a);
if(a!=null && b!=null){
  this.email=a;
  this.password=b
}
  }

  async ngOnInit() {
    this.loading = await this.loadingCtrl.create({
      message: 'Connecting ...'
    });
  }


  async presentLoading(loading) {
    await loading.present();
  }


  async fblogin() {
  

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
  login(){
    console.log(this.remember);
if(this.email!+null && this.password!=null && this.email!='' && this.password!=''){
  this.auth.login(this.email,this.password).then((res:any)=>{
    localStorage.setItem('softUser',res.user.uid);
    if(this.remember==true){
      localStorage.setItem('softemail',this.email);
      localStorage.setItem('softpassword',this.password);
      this.router.navigate(["/home"]);
    }else{
      this.router.navigate(["/home"]);
    }
    
  
  }).catch(err=>{
    console.log(err);
  })
}
  }
}
