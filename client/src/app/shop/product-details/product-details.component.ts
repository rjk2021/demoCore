import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute,
    private bcService:BreadcrumbService) {


      this.bcService.set('@productDetails',' ');
     }

  ngOnInit(): void {

    this.loadProduct();

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
