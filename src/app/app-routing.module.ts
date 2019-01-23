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
  { path: 'details/:id',
    loadChildren: './details/details.module#DetailsPageModule',
  },
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
    canActivate: [AuthGuardGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
