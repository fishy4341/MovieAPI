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
          }
        ]
      },
      {
        path: 'to-see',
        children: [
          {
            path: '',
            loadChildren: './to-see/to-see.module#ToSeePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/user-list/seen',
        pathMatch: 'full'
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
  declarations: [
    UserListPage,
  ],
  exports: [
  ]
})
export class UserListPageModule {}
