import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SeenPage } from './seen.page';
import { FilterModule } from '../filter/filter.module';

const routes: Routes = [
  {
    path: '',
    component: SeenPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FilterModule
  ],
  declarations: [SeenPage]
})

export class SeenPageModule {}
