import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {


  basket$= new Observable<IBasket|null>();
  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.basket$= this.basketService.basket$;
  }


  removeBasketItem(item:IBasketItem){

    this.basketService.removeItemFromBasket(item);
  }

  increamentItemQauntity(item:IBasketItem){
  
    this.basketService.increamentItemQauntity(item);

  }

  decreamentItemQauntity(item:IBasketItem){

    this.basketService.decreamentItemQauntity(item);
  }

}
