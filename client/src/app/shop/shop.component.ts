import { Component, OnInit } from '@angular/core';
import { IBrands } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { ITypes } from '../shared/models/types';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[] = [];
  brands: IBrands[] = [];
  types: ITypes[] = [];
  shopParams= new ShopParams();
  totalCount:number=0;

 
  sortOptions:Array<any> =[

    {name:'Alphabetical ',value:'name'},
    {name:'Price:low to high',value:'priceAsc'},
    {name:'Price:high to low',value:'priceDesc'},
  ]
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes()

  }
  getProducts() {

    this.shopService.getProducts(this.shopParams).subscribe(response => {


      this.products = response!.data;
      this.totalCount=response!.count;
      this.shopParams.pageSize=response!.pageSize;
      this.shopParams.pageNumber=response!.pageIndex;
    }, error => { console.log(error) }
    )
  }
  getBrands() {
    this.shopService.getBrands().subscribe(response => {

      this.brands = [{id:0,name:"All"},...response];


    }, error => { console.log(error) }
    )
  }
  getTypes() {
    this.shopService.getTypes().subscribe(response => {

      this.types =  [{id:0,name:"All"},...response];


    }, error => { console.log(error) }
    )
  }
   onBrandSelected(brandId:number){
     this.shopParams.brandId=brandId;
     this.getProducts();
   }
   onTypeSelected(typeId:number){
    this.shopParams.typeId=typeId;
    this.getProducts();
  }
  onSortSelected(sort:string){
   // alert(sort)
    this.shopParams.sort=sort;
    this.getProducts();
  }

  OnPageChanged(event:any){

    debugger;
    this.shopParams.pageNumber=event.page;
    console.log(event.page)
    this.getProducts();
    //this.shopParams.pageSize=
  }
}
