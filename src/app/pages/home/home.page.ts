import { Component, OnInit } from '@angular/core';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { finalize, first } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api/api.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {map} from 'rxjs/operators';
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
userData;
monthLotteries;
weekLotteries;

  constructor(private api:ApiService,private helper:HelperService,
    private camera: Camera,
    private afStorage: AngularFireStorage,
    ) {
      this.api.getUser(localStorage.getItem('softUser')).subscribe(res=>{
this.userData=res;
      })
     }

  ngOnInit() {
    this.getMonthlyLotteries();
    this.getWeeklyLotteries();
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
let data={
  lotteryNo:this.lotteryNo,
  lotteryImage:this.lotteryImage,
  date: Date.now(),
  userId:localStorage.getItem('softUser')
}
this.api.addLottery(data).then((res:any)=>{
let data1={
  points:this.userData.points+1
}
this.api.updateUser(localStorage.getItem('softUser'),data1).then(res=>{
this.helper.presentToast('Data submitted Successfully..');
this.lotteryNo=null;
this.lotteryImage='';
this.userImage=null;
this.newEntry=false;
}).catch(err=>{
  this.helper.presentToast(err)
})
}).catch(err=>{
  this.helper.presentToast(err)
})
    }else{
      this.color='red';
      this.helper.presentToast('Enter Lottery Number ')
    }
  }

getMonthlyLotteries(){
this.api.getSpecificLottery(localStorage.getItem('softUser')).pipe(map(list => list.map(a => {
  const data = a.payload.doc.data();
  const id = a.payload.doc.id;
  return { id, ...data };
}))).subscribe((res:any)=>{
  console.log(res);
  let d= new Date;
  
let a=res.filter(item=>{
  let dummy=new Date(item.date)
  console.log(dummy);
let cyear=dummy.getFullYear();
let cmonth= dummy.getMonth();
return cyear==d.getFullYear() && cmonth== d.getMonth()
})
console.log(a);
this.monthLotteries=a;

})
}

getWeeklyLotteries(){
  this.api.getSpecificLottery(localStorage.getItem('softUser')).pipe(map(list => list.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
  }))).subscribe((res:any)=>{
    console.log(res);
 
    var curr = new Date; 
    console.log(curr.getDate());
    console.log(curr.getDay());
    curr.setUTCHours(0,0,0,0)
    var first = (curr.getDate() - curr.getDay())+4; // First day is the day of the month - the day of the week
var last = first + 7; // last day is the first day + 6

var firstday = new Date(curr.setDate(first));
var lastday = new Date(curr.setDate(last));
console.log(firstday);
console.log(lastday);
  let a=res.filter(item=>{
    var dummy=new Date(item.date)
    console.log(dummy);

  return dummy>=firstday && dummy< lastday
  })
  console.log(a);
  this.weekLotteries=a;
  // this.monthLotteries=a;
  
  })
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
          this.lotteryImage=this.userImage;
  
          
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
