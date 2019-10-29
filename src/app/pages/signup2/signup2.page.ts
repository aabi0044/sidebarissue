import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.page.html',
  styleUrls: ['./signup2.page.scss'],
})
export class Signup2Page implements OnInit {
  password;
  repassword;
  cnf;
  color;
  loader: any=null;
  constructor(private api: ApiService,
    private loadingController:LoadingController,
    private nav: NavController, private auth: AuthService, private helper: HelperService) { }

  ngOnInit() {
  }
  register() {
    if (this.cnf == true) {
      this.color = 'blue';
      if (this.password == this.repassword && this.password != null && this.repassword != null) {
        this.helper.presentLoading('Processing Request... ')
        this.auth.signup(this.api.user.email, this.password).then((res: any) => {
          console.log(res);

          localStorage.setItem('softUser', res.user.uid);
          let data = {
            name: this.api.user.name,
            email: this.api.user.email,
            phoneNumber: this.api.user.extension + this.api.user.phone,
            dob: this.api.user.dob,
            country: this.api.user.country,
            terms: this.api.user.agreement,
            emailNotification: this.api.user.emailNotification,
            creationDate: Date.now()
          }
          console.log(data);
          this.api.createUser(res.user.uid, data).then(resp => {
            this.helper.dismissLoad();
            this.helper.presentToast('Successfully Registered...');

            console.log("user Created");
            this.nav.navigateRoot(['/menu/home']);
          }).catch(err => {
            console.log(err);
            this.helper.dismissLoad();
            this.helper.presentToast(err);
          })
        }).catch(err => {
          console.log(err);
          this.helper.dismissLoad();
          this.helper.presentToast(err);
        })


      } else {
      
        this.helper.dismissLoad();
        this.helper.presentToast('Please fill all inputs correctly..');
      }
    } else {
      this.color = 'red';
      console.log("object");
    }
  }
  async presentLoading(msg) {
    this.loader = await this.loadingController.create({
      message: msg,
      spinner: "crescent"
    });
    await this.loader.present();
  }
}
