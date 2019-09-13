import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor() { }

  ngOnInit() {
    var curr = new Date; 
    console.log(curr.getDate());
    console.log(curr.getDay());
    curr.setUTCHours(0,0,0,0)
    var first = (curr.getDate() - curr.getDay())+4; // First day is the day of the month - the day of the week
var last = first + 7; // last day is the first day + 6

var firstday = new Date(curr.setDate(first)).toUTCString();
var lastday = new Date(curr.setDate(last)).toUTCString();
console.log(firstday);
console.log(lastday);
  }
}
