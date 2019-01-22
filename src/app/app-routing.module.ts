import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   loadChildren: './home/home.module#HomePageModule'
  // },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'details/:id', loadChildren: './details/details.module#DetailsPageModule' },
  { path: 'user-list', loadChildren: './user-list/user-list.module#UserListPageModule' },
  { path: 'seen', loadChildren: './user-list/seen/seen.module#SeenPageModule' },
  { path: 'to-see', loadChildren: './user-list/to-see/to-see.module#ToSeePageModule' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
