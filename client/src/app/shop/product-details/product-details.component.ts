import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {


  product: IProduct;
  qauntity=1;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute,
    private bcService:BreadcrumbService,private basketService:BasketService) {


      this.bcService.set('@productDetails',' ');
     }

  ngOnInit(): void {

    this.loadProduct();

  }

  addItemToBasket(){

    
    this.basketService.addItemToBasket(this.product,this.qauntity);
  }
  increamentQauntity(){

    this.qauntity++;
  }
  decreamentQauntity(){

    if(this.qauntity>1)
    this.qauntity--;
  }



  loadProduct() {

    console.log('this is URL params:')
     console.log(+this.activatedRoute.snapshot.params.id)
   
    this.shopService.getProduct( +this.activatedRoute.snapshot.params.id).subscribe(product => {

      

      this.product = product;
      this.bcService.set('@productDetails',product.name)
    }, error => {
      console.log(error);
    }
    );
  }

}
