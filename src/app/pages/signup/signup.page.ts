import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  name;
dob;
email;
phone;
country;
phoneExtension;
terms=false;
emailNotification=false;
color;
  constructor(private api:ApiService,private router:Router,private helper:HelperService) { }

  ngOnInit() {
  }
  countryName(event){
console.log(event);
this.country=event;
  }
  continue(){
    if(this.validateEmail(this.email)==true){
      this.color='green';
      if(this.name !=null && this.email!=null && this.country!=null &&
        this.phone!=null && this.phoneExtension!=null&&this.dob!=null){
          
          this.phoneExtension=String(this.phoneExtension);
          this.phone=String(this.phone);
 this.api.user.name=this.name;
 this.api.user.email=this.email;
 this.api.user.dob=this.dob;
 this.api.user.phone=this.phone;
 this.api.user.agreement=this.terms;
 this.api.user.emailNotification=this.emailNotification;
 this.api.user.extension=this.phoneExtension;
 this.api.user.country=this.country;
 console.log(this.api.user);
 this.router.navigate(['signup2'])
 
 
       }else{
 console.log("please Fill all");
 this.helper.presentToast('Please fill all inputs..')
       }
    }else{
      console.log("bad email ");
      this.helper.presentToast('please fill correct data..')
      this.color='red';
    }


  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
