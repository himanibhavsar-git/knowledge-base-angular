import { Component, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';
import { HttpRequestsService } from 'src/app/shared/providers/http-requests.service';
import { HelperService } from 'src/app/shared/providers/helper.service';
import { ApiResponse } from 'src/app/models/response';
import { Pagination } from 'src/app/shared/providers/constant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  public imageSources: (string | IImage)[] = [];
  public imageHeight: string;
  public categories: any[];

  // Pagination
  public totalRows: number;
  public currentPage = 1;
  public pagination = Pagination;

  constructor(
    private httpService: HttpRequestsService,
    private route: ActivatedRoute,

    private helperService: HelperService,
  ) { }

  ngOnInit() {
    this.pagination.itemsPerPage = 10;
    this.getCategories();
  }

  async getCategories() {
    this.httpService.showLoading();
    const categories = await this.httpService.post(`/category/list-with-content?page=${this.currentPage}`, true) as ApiResponse;
    this.categories = categories.data;
    this.totalRows = categories.totalRows;
    this.httpService.hideLoading();
  }

  pageChanged(event: { page: number; }) {
    this.helperService.windowLocationScroll();
    this.currentPage = event.page;
    this.getCategories();
  }

}
