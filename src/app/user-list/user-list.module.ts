import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserListPage } from './user-list.page';


const routes: Routes = [
  {
    path: '',
    component: UserListPage,
    children: [
      {
        path: 'seen',
        children: [
          {
            path: '',
            loadChildren: './seen/seen.module#SeenPageModule'
          },
          {
            path: '',
            loadChildren: './to-see/to-see.module#ToSeePageModule'
          }
        ]
      },
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
  declarations: [UserListPage,]
})
export class UserListPageModule {}
