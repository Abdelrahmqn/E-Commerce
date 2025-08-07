import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe,TitleCasePipe,DatePipe,UpperCasePipe, LowerCasePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {


@Input() product!:Product


  convertNumber(number:number){
 return Math.round(number)
}

  name='ahmed'
  ngOnChanges(){


}
}

