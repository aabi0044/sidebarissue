import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'aboutus',
        loadChildren: '../aboutus/aboutus.module#AboutusPageModule'
      },
      {
        path: 'instructions',
        loadChildren: '../instructions/instructions.module#InstructionsPageModule'
      },
      {
        path: 'lottery',
        loadChildren: '../lottery/lottery.module#LotteryPageModule'
      },
      {
        path: 'contact',
        loadChildren: '../contact/contact.module#ContactPageModule'
      },
      {
        path: 'disclaimer',
        loadChildren: '../disclaimer/disclaimer.module#DisclaimerPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
