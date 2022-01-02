import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { IPagination } from './shared/models/pagination';
import {IProduct} from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Welcome to Electronics component shopping website';
 
  
  constructor(private basketService: BasketService) {
   
  }
  ngOnInit(): void {

   const basketId= localStorage.getItem('basket_id');
   if(basketId){

    const basket = this.basketService.getBasket(basketId).subscribe(()=>{

      console.log('basket initilised!!')
    },error=>{console.log(error)});
   }
  }
}
