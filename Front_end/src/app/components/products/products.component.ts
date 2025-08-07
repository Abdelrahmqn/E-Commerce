import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Product } from '../../interfaces/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  constructor(private _TestService:TestService){}
  name="ahmed"

  pizza:Product[] =[];
  getRecipes(){
    this._TestService.getRecipes().subscribe({
      next:(data)=>{
        console.log(data);
        this.pizza = data.recipes

      },
      error(err) {
        console.log(err);
        
      },
    })
  }

convertNumber(number:number){
 return Math.round(number)
}

ngOnInit(): void {
  this.getRecipes()
  
}





}
