import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpRequestsService } from 'src/app/shared/providers/http-requests.service';
import { LocalStorageService } from 'src/app/shared/providers/local-storage.service';
import { SignUp, UploadProfile } from 'src/app/models/auth';
import { RegexEnum } from 'src/app/shared/providers/regex';
import { ValidationService } from 'src/app/shared/providers/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @Output() closeModalEvent = new EventEmitter<any>();

  public signupForm: FormGroup;
  public modalRef: BsModalRef;

  constructor(
    private formbuilder: FormBuilder,
    private httpRequest: HttpRequestsService,
    private localstorage: LocalStorageService,
    private bsModalService: BsModalService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.signUpFormGenerate();
  }

  signUpFormGenerate() {
    this.signupForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(RegexEnum.email)]],
      password: ['', [Validators.required, Validators.pattern(RegexEnum.password_validation)]],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: ValidationService.checkIfMatchingPasswords('password', 'confirmPassword'),
      });
  }

  get signup() { return this.signupForm.controls; }

  closeModal() {
    this.closeModalEvent.emit();
  }

  closeEmailModal() {
    this.modalRef.hide();
  }

  async submit() {
    const requestBody = { ...this.signupForm.value };
    requestBody.email = this.signupForm.get('email').value.toLowerCase();

    delete requestBody.confirmPassword;
    const requestURL = '/user/sign-up';
    try {
      this.httpRequest.showLoading();
      const res = await this.httpRequest.post(requestURL, requestBody, true) as SignUp;
      this.localstorage.setLocalStore('LoggedUser', res);
      this.localstorage.setLocalStore('token', res.token);
      this.httpRequest.hideLoading();
      this.closeModal();
      this.router.navigate(['/category']);
    } catch (error) {
      this.httpRequest.hideLoading();
    }
  }
}
