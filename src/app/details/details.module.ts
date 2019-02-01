import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailsPage } from './details.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsPage,
    children: [
      {
        path: 'movie-details',
        children: [
          {
            path: '',
            loadChildren: './movie-details/movie-details.module#MovieDetailsPageModule'
          }
        ]
      },
      {
        path: 'trailers',
        children: [
          {
            path: '',
            loadChildren: './videos/videos.module#VideosPageModule'
          }
        ]
      },
      {
        path: 'comments',
        children: [
          {
            path: '',
            loadChildren: './comments/comments.module#CommentsPageModule'
          }
        ]
      },
      {
        path: 'related',
        children: [
          {
            path: '',
            loadChildren: './related/related.module#RelatedPageModule'
          }
        ]
      },
      // {
      //   path: '',
      //   redirectTo: '/details/movie-details',
      //   pathMatch: 'full'
      // }
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
  declarations: [DetailsPage]
})
export class DetailsPageModule {}
