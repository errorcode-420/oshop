import { Component, Input } from '@angular/core';
import { lightUp, slide } from 'src/app/shared/services/animation.service';
import { CartItem } from 'src/app/shared/models/cart-item';
import { PriceService } from 'src/app/shared/services/data/price.service';

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
  animations: [
    slide,
    lightUp
  ]
})
export class ItemDetailsComponent {
  @Input('cart-item') item!: CartItem
  @Input('quantityEditable') quantityEditable = true;

  animationState: string = 'end';


  constructor(private priceService: PriceService){
  }

  get priceSum(): number {
    return this.priceService.getPriceSum(this.item);
  }

  triggerLightUp(color: any) {
    this.animationState = color + '-start';
    setTimeout(() => {
      this.animationState = color + '-end';
    }, 200);
  }


}
export { CartItem };

