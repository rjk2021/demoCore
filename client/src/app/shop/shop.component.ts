import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('search',{static:true}) searchTerm:ElementRef
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
     this.shopParams.pageNumber=1;
     this.getProducts();
   }
   onTypeSelected(typeId:number){
    this.shopParams.typeId=typeId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }
  onSortSelected(sort:string){
   // alert(sort)
    this.shopParams.sort=sort;
    this.getProducts();
  }

  OnPageChanged(event:any){

    if( this.shopParams.pageNumber!==event){
    this.shopParams.pageNumber=event;
    console.log(event)
    this.getProducts();
    }
    //this.shopParams.pageSize=
  }
  OnSearch(){

   this.shopParams.search=this.searchTerm.nativeElement.value;
   this.shopParams.pageNumber=1;
   this.getProducts();


  }
  OnReset(){
    this.searchTerm.nativeElement.value='';
    this.shopParams= new ShopParams();
    this.getProducts();
  }
}
