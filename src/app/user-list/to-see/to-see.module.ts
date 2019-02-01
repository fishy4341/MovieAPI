import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ToSeePage } from './to-see.page';
import { FilterModule } from '../filter/filter.module';

const routes: Routes = [
  {
    path: '',
    component: ToSeePage
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
  declarations: [ToSeePage]
})
export class ToSeePageModule {}
