import { Component, OnInit } from '@angular/core';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api/api.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  newEntry=false;
  userImage;
user;
base64Image: string;
sourcex: any;
softUid;
ref: AngularFireStorageReference;
task: AngularFireUploadTask;
image=false;
lotteryNo;
lotteryImage;
color;
  constructor(private api:ApiService,private helper:HelperService,
    private camera: Camera,
    private afStorage: AngularFireStorage,
    ) { }

  ngOnInit() {
    var myArray=[{
      a:0
    },
    {
      a:1
    },
    {
      a:2
    }
  ,{
    a:3
  }
,{
  a:4
}
,{
  a:5
}]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    console.log(rand);
  }
  newPoints(){
    
  this.newEntry=true;



  }
  addLottery(){
    if (this.lotteryNo!=null){

    }else{
      this.color='red';
    }
  }
  choosePicture() {
    console.log("object");
    let myfunc = () => {
      this.takePhoto('library');
    };
    let myfunc1 = () => {
      this.takePhoto('camera');
    };
    this.helper.presentActionSheet('Choose an option.', 'Gallery', 'Camera', myfunc, myfunc1);
  }
  takePhoto(source) {

    if (source === 'camera') {
      this.sourcex = this.camera.PictureSourceType.CAMERA;
    } else if (source === 'library') {
      this.sourcex = this.camera.PictureSourceType.PHOTOLIBRARY;
    }
    const options: CameraOptions = {
      sourceType: this.sourcex,
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.uploadPhoto();
    }, (err) => {
      this.helper.presentToast(err.message);
    });
  
  }
  uploadPhoto() {
    this.helper.presentLoading('Uploading image...');
    // const id = Math.random().toString(36).substring(2);
    // this.ref = this.afStorage.ref(id);
    this.softUid = localStorage.getItem('softUser');
    this.ref = this.afStorage.ref('userLotteryData').child(this.softUid);
    let task = this.ref.putString(this.base64Image, 'data_url');
    task.snapshotChanges()
      .pipe(finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.helper.dismissLoad();
          this.helper.presentToast('Picture uploaded successfully.');
          this.userImage = url;
          console.log(this.userImage);
          this.image=true;
  
          
      //for updating url in profile node
      // this.updateURLofUser(this.userImage);
          // let data={
          //   profile_url : this.userImage
          //   }
          //   console.log(data);
        //   this.api.updateUser(this.softUid,data).then(res=>{
        //     console.log("User profileupdated");
        // })
      ////////////////////////////////////////
  
        });
      })).subscribe(res => {
  
      }, err => {
        this.helper.presentToast(err.message);
      });
 
  }

}
