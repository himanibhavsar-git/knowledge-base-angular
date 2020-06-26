import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { HomeContentComponent } from './shared/component/home-content/home-content.component';
import { AuthGuard } from './helper/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeContentComponent,
  },
  {
    path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'category', loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule)
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // For not displaying errors to users
  constructor(private router: Router) {
    // TODO uncomment below code if you don't want to display errors to users
    // this.router.errorHandler = (error: any) => {
    //   this.router.navigate(['home']); // or redirect to default route
    // };
  }
}
