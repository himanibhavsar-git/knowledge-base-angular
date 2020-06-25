import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpRequestsService } from 'src/app/shared/providers/http-requests.service';
import { LocalStorageService } from 'src/app/shared/providers/local-storage.service';
import { Router } from '@angular/router';
import { SignIn } from 'src/app/models/auth';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  @Output() closeModalEvent = new EventEmitter<any>();
  public modalRef: BsModalRef;
  public signinForm: FormGroup;
  @ViewChild('signupform', { static: false }) signupform: TemplateRef<any>;
  public userData: any;

  constructor(
    private router: Router,
    private bsModalService: BsModalService,
    protected formbuilder: FormBuilder,
    private httpRequest: HttpRequestsService,
    private localstorege: LocalStorageService,
    private socialAuthService: AuthService,
    private localstorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.signinForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    });
  }

  get signin() { return this.signinForm.controls; }

  closeModal() {
    this.closeModalEvent.emit();
  }

  goToForgotPassword(template: TemplateRef<any>) {
    this.closeModal();
    this.modalRef = this.bsModalService.show(template, { class: 'modal-xs' });
  }

  closeForgotPasswordModal() {
    this.modalRef.hide();
  }

  /**
   * doGoogleLogin() - Google login.
   */
  async doGoogleLogin() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (user) => {
        this.localstorage.setLocalStore('loginFrom', 'Google');
        this.localstorage.setLocalStore('userData', JSON.stringify(user));
        if (this.localstorage.getLocalStore('userData')) {
          this.userData = JSON.parse(this.localstorage.getLocalStore('userData'));
          this.googleSignInApiCall(this.userData);
        }
      }).catch(error => {
        console.error('err', error);
      });
  }

  async googleSignInApiCall(formData: any) {
    try {
      const reqBody = {
        email: formData.email,
        providerId: formData.id,
        name: formData.name
      };
      const res = await this.httpRequest.post('/user/social-sign-in', reqBody, true) as SignIn;
      this.localstorege.setLocalStore('LoggedUser', res);
      this.localstorege.setLocalStore('token', res.token);
      this.localstorage.clearStorageFor('loginFrom');
      this.localstorage.clearStorageFor('userData');
      this.httpRequest.hideLoading();
      location.reload();
      this.closeModal();
      this.router.navigate(['/category']);
    } catch (err) {
      this.httpRequest.hideLoading();
    }
  }


  /** Normal signin */
  async submit() {
    if (this.signinForm.valid) {
      this.httpRequest.showLoading();
      try {
        const signInData = {
          password: this.signinForm.value.password,
          email: this.signinForm.value.email.toLowerCase(),
        };
        const res = await this.httpRequest.post('/user/sign-in', signInData, true) as SignIn;
        this.localstorege.setLocalStore('LoggedUser', res);
        this.localstorege.setLocalStore('token', res.token);
        this.httpRequest.hideLoading();
        location.reload();
        this.closeModal();
        this.router.navigate(['/category']);
      } catch (error) {
        this.httpRequest.hideLoading();
      }
    }
  }

  openSignup() {
    this.closeModal();
    this.modalRef = this.bsModalService.show(this.signupform, { class: 'modal-lg' });
  }

  closeSignupModal() {
    this.modalRef.hide();
  }

}
