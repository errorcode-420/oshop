import { Component } from '@angular/core';
import { fade } from 'src/app/shared/services/animation.service';

@Component({
  selector: 'empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.css'],
  animations:[fade]
})
export class EmptyCartComponent {

  displayImage!: number;
  ngOnInit() {
    this.displayImage = 0;
    this.loadImage();
  }

  loadImage(){
    setTimeout(() => {
      this.displayImage=1;
    }, 1000);
  }

}
