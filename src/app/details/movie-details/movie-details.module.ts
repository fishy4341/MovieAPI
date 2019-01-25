import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MovieDetailsPage } from './movie-details.page';
import { RatingComponent } from './rating/rating.component';

const routes: Routes = [
  {
    path: '',
    component: MovieDetailsPage
  }
];

@NgModule({
  entryComponents: [RatingComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MovieDetailsPage, RatingComponent]
})
export class MovieDetailsPageModule {}
