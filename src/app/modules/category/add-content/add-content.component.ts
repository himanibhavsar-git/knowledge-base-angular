import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpRequestsService } from 'src/app/shared/providers/http-requests.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiResponse } from 'src/app/models/response';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {

  @Output() closeModalEvent = new EventEmitter<any>();
  public modalRef: BsModalRef;
  public addContentForm: FormGroup;
  public userData: any;
  public categoryId: number;

  constructor(
    private router: Router,
    protected formbuilder: FormBuilder,
    private route: ActivatedRoute,

    private httpRequest: HttpRequestsService,
  ) { }

  ngOnInit() {
    this.addContentForm = this.formbuilder.group({
      text: ['', Validators.required],
    });
    this.route.paramMap.subscribe((route: any) => {
      this.categoryId = route.params.id;
    });
  }

  get addContent() { return this.addContentForm.controls; }

  closeModal() {
    this.closeModalEvent.emit();
  }

  /** Save category */
  async submit() {
    if (this.addContentForm.valid) {
      this.httpRequest.showLoading();
      try {
        const data = {
          text: this.addContentForm.value.text,
        };
        const res = await this.httpRequest.post(`/category/${this.categoryId}/content/add`, data) as ApiResponse;
        this.httpRequest.hideLoading();
        this.closeModal();
        this.router.navigate(['/category']);
      } catch (error) {
        this.httpRequest.hideLoading();
      }
    }
  }
}
