import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'details',
    loadChildren: './details/details.module#DetailsPageModule',
  },
  { path: 'movie-details', loadChildren: './details/movie-details/movie-details.module#MovieDetailsPageModule' },
  { path: 'videos', loadChildren: './details/videos/videos.module#VideosPageModule' },
  { path: 'comments', loadChildren: './details/comments/comments.module#CommentsPageModule' },
  { path: 'user-list',
    loadChildren: './user-list/user-list.module#UserListPageModule',
    canActivate: [AuthGuardGuard]
  },
  { path: 'seen',
    loadChildren: './user-list/seen/seen.module#SeenPageModule',
    canActivate: [AuthGuardGuard]
  },
  { path: 'to-see',
    loadChildren: './user-list/to-see/to-see.module#ToSeePageModule',
    canActivate: [AuthGuardGuard] },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  { path: '**', loadChildren: './not-found/not-found.module#NotFoundPageModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
