import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  isLoading = false;
  loader: any=null;
  alert: any;
  notLength: number;
  constructor(private alertCtrl: AlertController,
    public loadingController: LoadingController,
    private toastCtrl: ToastController,
    private actionSheetController: ActionSheetController) { }

  async presentActionSheet(title, option1, option2, f1, f2) {
    const actionSheet = await this.actionSheetController.create({
      header: title,
      buttons: [{
        text: option1,
        // icon: 'trash',
        handler: f1
      }, {
        text: option2,
        //icon: 'share',
        handler: f2
      }]
    });
    await actionSheet.present();
  }
  async presentLoading(msg) {
  
    return await this.loadingController.create({
      duration:1500,
      message: msg,
      spinner: "crescent"
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        console.log(this.isLoading);
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });



  }
  async dismissLoad() {
    this.isLoading = false;
    console.log(this.isLoading);
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
