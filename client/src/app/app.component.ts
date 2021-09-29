import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from './models/pagination';
import {IProduct} from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Welcome to Electronics component shopping website';
  productslist: IProduct[] = [];
  
  constructor(private http: HttpClient) {
   
  }
  ngOnInit(): void {

    debugger;
    this.http.get('https://localhost:5001/api/products?PageSize=100').subscribe(
      (response: any) => 
    
    {
      this.productslist=response.data;
      console.log( this.productslist);
    }, error => {

      console.log(error);
    });

  }
}
