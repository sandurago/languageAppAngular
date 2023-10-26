import { Component } from '@angular/core';

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

  /** METHODS */
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
  }
}
