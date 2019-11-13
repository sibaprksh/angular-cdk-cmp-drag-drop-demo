import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: any = {};
  @Output() close: EventEmitter<any> = new EventEmitter<any>(); 

  constructor() { } 

  ngOnInit() {
  }

  public onClose() { 
    this.close.emit("closed triggered!!");
  }

}