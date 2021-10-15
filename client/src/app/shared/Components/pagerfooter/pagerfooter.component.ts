import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagerfooter',
  templateUrl: './pagerfooter.component.html',
  styleUrls: ['./pagerfooter.component.scss']
})
export class PagerfooterComponent implements OnInit {
  @Input() totalCount: number;
  @Input() pageSize:number;
  @Output() pageChanged= new EventEmitter<number>(); 

  constructor() { }

  ngOnInit(): void {
  }
  onpageFooterChanged(event:any)
  {

   this.pageChanged.emit(event.page);

  }
}
