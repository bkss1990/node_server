import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(  private authenticationService: AuthenticationService,
    private alertService: AlertService,   
       private router: Router,
  ) { }

  ngOnInit() {
  }


  logout(){

    this.authenticationService.logout();

    this.router.navigate(['login']);

  }

}
