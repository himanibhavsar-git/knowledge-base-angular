import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpRequestsService } from '../../providers/http-requests.service';
import { Router } from '@angular/router';
import { HelperService } from '../../providers/helper.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit, OnDestroy {
  constructor(
    private httpService: HttpRequestsService,
    private router: Router,
    private helperService: HelperService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
