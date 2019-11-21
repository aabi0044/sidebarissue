import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';
// import undefined = require('firebase/empty-import');

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email;
  password;
  remember = false;
  loading: any;
  constructor(
    private router: Router,
  
    public loadingCtrl: LoadingController,
    private fireAuth: AngularFireAuth,
    private auth: AuthService,
    private helper:HelperService
  ) {
    let a = localStorage.getItem('softemail');
    let b = localStorage.getItem('softpassword');
    console.log(a);
    if (a != null && b != null) {
      this.email = a;
      this.password = b
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



  onLoginError(err) {
    console.log(err);
  }
  login() {
   
    console.log(this.remember);
    if (this.email!= null && this.password != null && this.email != '' && this.password != '') {
      this.helper.presentLoading('Logining...')
      this.auth.login(this.email, this.password).then((res: any) => {
        localStorage.setItem('softUser', res.user.uid);
        this.helper.dismissLoad();
        this.helper.presentToast('login successfully.')
        if (this.remember == true) {
          localStorage.setItem('softemail', this.email);
          localStorage.setItem('softpassword', this.password);
          this.router.navigate(["/menu/home"]);
        } else {
          this.router.navigate(["/menu/home"]);
        }


      }).catch(err => {
        this.helper.dismissLoad();
        this.helper.presentToast(err)
        console.log(err);
      })
    }else{
   
      this.helper.presentToast('Please Fill all the inputs..')
    }
  }
}
