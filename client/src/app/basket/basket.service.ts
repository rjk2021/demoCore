import { HttpClient } from '@angular/common/http';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { map } from 'rxjs/operators';// This is where I import map operator
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {


  baseUrl=environment.apiUrl;
  private basketSource= new BehaviorSubject<IBasket|null>(null);
  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<IBasketTotals|null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http:HttpClient) {


   }

   getBasket(id: string) 
   {
    return this.http.get<IBasket>(this.baseUrl + "basket?id=" + id)
    .pipe(

      map((basket: IBasket)=>  {this.basketSource.next(basket)
        this.calculateTotals();
      }
      )
    );
  
      
    
  }
  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + "basket", basket).subscribe(
      (response: IBasket) => {
        console.log(response);
        this.basketSource.next(response);
        this.calculateTotals();
      },
      error => {
        console.log(error);
      }
    );
  }
  getCurrentBasketValue() {
    return this.basketSource.value;
  }


  addItemToBasket(item:IProduct,quantity=1){

   const itemToAdd:IBasketItem= this.mapProductToBasketItem(item,quantity);
   const basket  =this.getCurrentBasketValue()?? this.createBasket();
   basket!.items = this.addOrUpdateItem(basket!.items, itemToAdd, quantity);
   this.setBasket(basket!);

  }
  addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: any): IBasketItem[] {
    console.log(itemToAdd);
    console.log(items);
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    else {
      items[index].quantity += quantity;
    }
    return items;
  }
  increamentItemQauntity(item:IBasketItem)
  {
   const basket = this.getCurrentBasketValue();

   const findItemIndex = basket === null || basket === void 0 ? void 0 : basket.items.findIndex(x => x.id == item.id);
   if(findItemIndex!=null){
          basket!.items[findItemIndex].quantity++;
   }
   this.setBasket(basket!);



  }
  decreamentItemQauntity(item:IBasketItem)
  {

    debugger;
   const basket = this.getCurrentBasketValue();

   const findItemIndex = basket === null || basket === void 0 ? void 0 : basket.items.findIndex(x => x.id == item.id);
   if(findItemIndex!=null){
          if(basket!.items[findItemIndex].quantity>1){

            basket!.items[findItemIndex].quantity--;
            this.setBasket(basket!);
          }else{
            this.removeItemFromBasket(basket!.items[findItemIndex]);
          }

   }
   
  }
  removeItemFromBasket(item: IBasketItem) {
    debugger;
    const basket= this.getCurrentBasketValue();
    if(basket?.items.some(x=>x.id===item.id)){
      basket.items= basket.items.filter(x=>x.id!=item.id);

      if(basket.items.length>0){

        this.setBasket(basket);
      }else{
        this.deleteBasket(basket);
      }
    }

  }
  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl+'basket?id='+basket.id).subscribe(()=>{

      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');

    },error=>{console.log(error)});
  }
 
  private calculateTotals(){

    const basket= this.getCurrentBasketValue();
    const shipping=0;
   
    const subtotal=basket?.items.reduce((a,b)=>(b.price*b.quantity)+a,0);
    const total= subtotal!+shipping;


    this.basketTotalSource.next({shipping,subtotal,total});

  }
  private createBasket(): IBasket | null {
    const basket = new Basket();
    localStorage.setItem("basket_id", basket.id);
    return basket;
  }
  private mapProductToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: quantity,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    };
  }
}
