import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddContentComponent } from './add-content/add-content.component';


const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'add', component: AddCategoryComponent },
  { path: 'add/content/:id', component: AddContentComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
