import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import {map, first} from 'rxjs/operators'
@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.page.html',
  styleUrls: ['./lottery.page.scss'],
})
export class LotteryPage implements OnInit {
  weekWinner;
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.getCurrentWeekWinner();
  }
  getCurrentWeekWinner(){
    this.api.getWinners().pipe(map(list=>list.map(item=>{
      let data =item.payload.doc.data();
      let id =item.payload.doc.id;
      return{id,...data}
    }))).subscribe((res:any)=>{
      console.log(res);
      var curr = new Date;
    console.log(curr.getDate());
    console.log(curr.getDay());
    curr.setUTCHours(0,0,0,0)
    var first = (curr.getDate() - curr.getDay())-3; // First day is the day of the month - the day of the week
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
  this.weekWinner=a[0];
  
  })
  }
}
