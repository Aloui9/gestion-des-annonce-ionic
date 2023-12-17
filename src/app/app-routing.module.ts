import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'announcements',
    loadChildren: () => import('./announcements/announcements.module').then( m => m.AnnouncementsPageModule)
  },
  {
    path: 'add-announcement',
    loadChildren: () => import('./add-announcement/add-announcement.module').then( m => m.AddAnnouncementPageModule)
  },
  {
    path: 'my-announcements',
    loadChildren: () => import('./my-announcements/my-announcements.module').then( m => m.MyAnnouncementsPageModule)
  },
  {
    path: 'announcement-details',
    loadChildren: () => import('./announcement-details/announcement-details.module').then( m => m.AnnouncementDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
