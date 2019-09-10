import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SidemenuPage } from './sidemenu.page';

const routes: Routes = [
  {
    path: '',
    component: SidemenuPage,
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
  declarations: [SidemenuPage]
})
export class SidemenuPageModule { }
