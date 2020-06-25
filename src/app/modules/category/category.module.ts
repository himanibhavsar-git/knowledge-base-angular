import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './list/category-list.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryListComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SlideshowModule,
    PaginationModule.forRoot(),
    SharedModule,
    FormsModule,
  ],
  exports: []
})
export class CategoryModule { }
