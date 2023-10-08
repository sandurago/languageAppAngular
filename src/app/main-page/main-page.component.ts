import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  // DATA
  icon:string = '';
  action:string = '';
  linkAction:string = '';
  hasAccount:string = '';
  isLogin:boolean = false;

  url:string = 'http://localhost:8000/user';

  // CONSTRUCTOR
  //activatedRoute checks the route thats currently in the outlet
  constructor(public route: ActivatedRoute, private router: Router){};

  // METHODS
  outputData() {
    if (!this.isLogin) {
      this.icon = 'how_to_reg';
      this.action = 'register';
      this.linkAction = 'login';
      this.hasAccount = 'have';
    } else {
      this.icon = 'user';
      this.action = 'login';
      this.linkAction = 'register';
      this.hasAccount = 'don\'t have';
    }
  }

  newAction() {
    this.isLogin = !this.isLogin;
    this.outputData();
  }

  ngOnInit() {
    // this fires everytime I change the route. Possible solution? Create a user store.
    this.route.url.subscribe((params) => {
      if (params[0].path == 'login') {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
      this.outputData();
    })
  }
}
