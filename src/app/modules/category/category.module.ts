import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './list/category-list.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddContentComponent } from './add-content/add-content.component';

@NgModule({
  declarations: [CategoryListComponent, AddCategoryComponent, AddContentComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SlideshowModule,
    PaginationModule.forRoot(),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class CategoryModule { }
