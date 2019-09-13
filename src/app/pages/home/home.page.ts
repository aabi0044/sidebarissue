import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  newEntry=false;
  constructor() { }

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
}
