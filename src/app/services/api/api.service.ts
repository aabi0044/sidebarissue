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
}
