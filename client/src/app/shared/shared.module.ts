import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent, PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerfooterComponent } from './components/pagerfooter/pagerfooter.component';



@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerfooterComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports:[
    PaginationModule,
    PagingHeaderComponent,
    PagerfooterComponent
  
  ]
})
export class SharedModule { }
