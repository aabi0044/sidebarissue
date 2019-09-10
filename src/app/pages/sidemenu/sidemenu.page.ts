import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {
  pages = [
    {
      title: 'Home',
      url: '/sidemenu/home',
      icon: 'home'
    },
    {
      title: 'About us',
      url: '/sidemenu/aboutus',
      icon: 'home'
    },
    {
      title: 'Instructions',
      url: '/sidemenu/instructions',
      icon: 'home'
    },
    {
      title: 'Lottery',
      url: '/sidemenu/lottery',
      icon: 'home'
    },
    {
      title: 'Contact',
      url: '/sidemenu/contact',
      icon: 'home'
    }
  ];
  selectedPath: string;
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }
  ngOnInit() {
  }

}
