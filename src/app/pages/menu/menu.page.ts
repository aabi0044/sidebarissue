import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: 'Home',
      url: '/menu/home',
      icon: 'home'
    },
    {
      title: 'About us',
      url: '/menu/aboutus',
      icon: 'people'
    },
    {
      title: 'Instructions',
      url: '/menu/instructions',
      icon: 'cube'
    },
    {
      title: 'Lottery',
      url: '/menu/lottery',
      icon: 'cart'
    },
    {
      title: 'Contact',
      url: '/menu/contact',
      icon: 'paper-plane'
    }
  ];
  selectedPath = '';
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
