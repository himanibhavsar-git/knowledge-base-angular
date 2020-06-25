import { Injectable, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable()
export class HelperService {

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  windowLocationScroll() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
  openNewTab(url: string, target = '_blank') {
    window.open(url, target);
  }
}
