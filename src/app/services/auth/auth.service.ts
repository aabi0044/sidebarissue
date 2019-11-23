import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { HelperService } from '../helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth,private router:Router,private helper :HelperService) { }
  signup(email, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);

  }
  login(email, password){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  logout(){
    
    console.log("object");
    this.afAuth.auth.signOut()
  }
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verifyemail']);
    })
  }
  ResetPassword(email){
    return this.afAuth.auth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['login']);
      this.helper.presentToast('A password reset link has been sent to your emailaddress')
    }).catch(e => this.helper.presentToast('An error occurred while attempting to reset your password')); 
  }
}
