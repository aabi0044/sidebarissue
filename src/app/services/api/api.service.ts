import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
user={
  name:'',
dob:'',
email:'',
phone:'',
extension:'',
country:'',
agreement:false,
emailNotification:false
}
  constructor(private afs:AngularFirestore) { }
  createUser(id,data){
    return this.afs.doc('users/'+id).set(data);

  }
  getUser(id){
return this.afs.doc('users/'+id).valueChanges();
  }
  updateUser(id,data){
    return this.afs.doc('users/'+id).update(data);
  }
  addLottery(data){
    return this.afs.collection('lotteries').add(data);
  }
  getAllLotteries(){
    return this.afs.collection('lotteries').snapshotChanges();
  }
  getSpecificLottery(id){
    return this.afs.collection('lotteries',ref=>ref.where('userId','==',id)).snapshotChanges();
  }
}
