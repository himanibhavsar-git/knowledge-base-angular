import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpRequestsService } from 'src/app/shared/providers/http-requests.service';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/response';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Output() closeModalEvent = new EventEmitter<any>();
  public modalRef: BsModalRef;
  public addCategoryForm: FormGroup;
  public userData: any;

  constructor(
    private router: Router,
    protected formbuilder: FormBuilder,
    private httpRequest: HttpRequestsService,
  ) { }

  ngOnInit() {
    this.addCategoryForm = this.formbuilder.group({
      name: ['', Validators.required],
    });
  }

  get addCategory() { return this.addCategoryForm.controls; }

  closeModal() {
    this.closeModalEvent.emit();
  }

  /** Save category */
  async submit() {
    if (this.addCategoryForm.valid) {
      this.httpRequest.showLoading();
      try {
        const data = {
          name: this.addCategoryForm.value.name,
        };
        const res = await this.httpRequest.post('/category/new', data) as ApiResponse;
        this.httpRequest.hideLoading();
        this.closeModal();
        this.router.navigate(['/category']);
      } catch (error) {
        this.httpRequest.hideLoading();
      }
    }
  }
}
