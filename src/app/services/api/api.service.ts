import { Injectable } from '@angular/core';

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
  constructor() { }
}
