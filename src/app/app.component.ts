import { Component, AfterViewInit, AfterViewChecked } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LocalStorageService } from './shared/providers/local-storage.service';
import { HelperService } from './shared/providers/helper.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, AfterViewChecked {

  public modalRef: BsModalRef;
  public isCommingSoon = false;

  constructor(
    private localstorage: LocalStorageService,
    private helperService: HelperService,
  ) {
    this.helperService.windowLocationScroll();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() { }

  ngAfterViewChecked() {
  }

  ngAfterViewInit() {
  }

}
