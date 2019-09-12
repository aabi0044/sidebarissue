import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.page.html',
  styleUrls: ['./signup2.page.scss'],
})
export class Signup2Page implements OnInit {
password;
repassword;
  constructor(private api:ApiService,private nav:NavController,private auth:AuthService) { }

  ngOnInit() {
  }
register(){
  if(this.password==this.repassword && this.password!=null && this.repassword!=null){
this.auth.signup(this.api.user.email,this.password).then((res:any)=>{

  localStorage.setItem('softUser',res.user.uid);
  let data={
    name:this.api.user.name,
    email:this.api.user.email,
    phoneNumber:this.api.user.extension+this.api.user.phone,
    dob:this.api.user.dob,
    country:this.api.user.country,
    terms:this.api.user.agreement,
    emailNotification:this.api.user.emailNotification
  }
this.api.createUser(res.user.uid,data).then(resp=>{
  console.log("user Created");
  this.nav.navigateRoot(['/menu/home']);
}).catch(err=>{
  console.log(err);
})
}).catch(err=>{
  console.log(err);
})


  }else{
    console.log("fill all");
  }

}
}
