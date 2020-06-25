import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {

  private hostUrl = environment.API_URL;
  public isVerifiedUser = new Subject();
  private isUserVerifiedOrNot = true;
  public ErrorTranslation: { SERVER_ERROR_OR_NO_INTERNET: any; ERROR_TITLE: any; OKAY_TEXT: any; SUCCESS_TITLE: any; };
  constructor(
    public http: HttpClient,
    private spinner: NgxSpinnerService,
    private localstorage: LocalStorageService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
  }

  getHeader(headerOptions: any, doNotSendAuthorizationParam: boolean) {
    const headerParams = { authorization: '' };
    if (doNotSendAuthorizationParam !== true && this.localstorage.getLocalStore('token')) {
      headerParams.authorization = this.localstorage.getLocalStore('token');
    }
    if (headerOptions) {
      Object.assign(headerParams, headerOptions);
    }
    const headers = new HttpHeaders(headerParams);
    return { headers };
  }

  post(
    url: string, body: any, doNotSendAuthorizationParam: boolean = false, headerOptions: any = {}) {
    return new Promise((resolve, reject) => {
      const options = this.getHeader(headerOptions, doNotSendAuthorizationParam);
      this.http.post(`${this.hostUrl}${url}`, body, options).pipe(map((res) => {
        return res;
      })).subscribe((res) => {
        resolve(res);
      }, (err) => {
        this.handleError(err);
        reject(err);
      });
    });
  }

  get(url: string, doNotSendAuthorizationParam: boolean = false, headerOptions: any = {}) {
    return new Promise((resolve, reject) => {
      const options = this.getHeader(headerOptions, doNotSendAuthorizationParam);
      this.http.get(`${this.hostUrl}${url}`, options).pipe(map((res) => {
        return res;
      }))
        .subscribe((res) => {
          resolve(res);
        }, (err) => {
          this.handleError(err);
          reject(err);
        });
    });
  }

  delete(url: string, headerOptions: any = {}, doNotSendAuthorizationParam: boolean = false) {
    return new Promise((resolve, reject) => {
      const options = this.getHeader(headerOptions, doNotSendAuthorizationParam);
      this.http.delete(`${this.hostUrl}${url}`, options).pipe(map((res) => {
        return res;
      })).subscribe((res) => {
        resolve(res);
      }, (err) => {
        this.handleError(err);
        reject(err);
      });
    });
  }

  async handleError(err: { status: number; error: { error: any; }; }) {
    if (!this.isUserVerifiedOrNot) {
      return;
    }
    if (err.status === 400) {
      this.error(err.error.error);
    } else if (err.status === 404) {
      this.error(err.error.error);
      this.router.navigate(['/home']);
    } else if (err.status === 401) {
      this.error(err.error.error);
      this.router.navigate(['/home']);
    } else if (err.status === 412) {
      this.error(err.error.error);
    } else if (err.status === 500) {
      this.error(err.error.error);
    } else if (err.status === 0) {
      this.error(this.ErrorTranslation.SERVER_ERROR_OR_NO_INTERNET);
    }
  }

  showLoading() {
    this.spinner.show();
    this.document.body.classList.add('preventEvents');
  }

  hideLoading() {
    this.spinner.hide();
    this.document.body.classList.remove('preventEvents');
  }

  error(message: string) {
    Swal.fire({
      title: this.ErrorTranslation.ERROR_TITLE,
      text: message,
      icon: 'error',
      timer: 3000,
      confirmButtonText: this.ErrorTranslation.OKAY_TEXT
    });
    this.hideLoading();
  }

  async success(message) {
    Swal.fire({
      title: this.ErrorTranslation.SUCCESS_TITLE,
      text: message,
      icon: 'success',
      timer: 1000,
      confirmButtonText: this.ErrorTranslation.OKAY_TEXT
    });
  }

}
