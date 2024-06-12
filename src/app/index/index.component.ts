import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  /** DATA */
  images:Array<string> = ['../../assets/img/displaycrop.png', '../../assets/img/practicecrop.png'];
  bgImage:string;
  amount = this.images.length - 1;
  animateClass:string;
  backInDown:boolean;
  backInUp:boolean;
  action:string = 'login';
  linkAction:string = '';
  hasAccount:string = '';
  isLogin:boolean = false;

  url:string = 'http://localhost:5000/user';

  // CONSTRUCTOR
  //activatedRoute checks the route thats currently in the outlet
  constructor(public route: ActivatedRoute, private router: Router){};


  /** METHODS */
  // outputData() {
  //   if (!this.isLogin) {
  //     this.icon = 'person';
  //     this.action = 'register';
  //     this.linkAction = 'login';
  //     this.hasAccount = 'have';
  //   } else {
  //     this.icon = 'how_to_reg';
  //     this.action = 'login';
  //     this.linkAction = 'register';
  //     this.hasAccount = 'don\'t have';
  //   }
  // }
  animateImages(i:number) {
    this.bgImage = this.images[i];
    this.animateClass = 'animate__fadeInLeft';

    setTimeout(() => {
      this.animateClass = 'animate__fadeOutRight';
    }, 3500);

    setTimeout(() => {
      if(i < this.images.length-1) {
        i++;
        this.animateImages(i);
      } else {
        this.animateImages(0);
      }
    }, 5500);
  }

  ngOnInit() {
    this.animateImages(0);

    setTimeout(() => {
      this.backInDown = true;
    }, 100);
    setTimeout(() => {
      this.backInUp = true;
    }, 250);

    // this fires everytime I change the route. Possible solution? Create a user store.
  //  this.route.url.subscribe((params) => {
  //   if (params[0].path == 'login') {
  //     this.isLogin = true;
  //   } else {
  //     this.isLogin = false;
  //   }
  //   this.outputData();
  // })
  }
}
