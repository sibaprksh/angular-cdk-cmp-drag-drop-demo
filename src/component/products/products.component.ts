import { Component, OnInit, Input, Output } from '@angular/core';

import { DropComponent, Item } from '../../lib';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  @Input() item;
  @Output() itemDrop;
  currentInstance: any;

  loadPlaceholders() {
    if(this.item.children.length == 0){ 
      this.item.children = [new Item({name: 'placeholder-1'}), new Item({name: 'placeholder-2'})];
    }
  }

  products: Array<any> = []; 
  product: Object = {};
  
  constructor() {  }

  ngOnInit() { 
    debugger; 
    this.loadPlaceholders();
    this.currentInstance = this;

    this.products = [
      {
        "id": 1,
        "title": "Adidas UltraBOOST",
        "img": "https://www.flightclub.com/media/catalog/product/8/0/800238_1.jpg"
      },
      {
        "id": 2,
        "title": "Nike Air Max",
        "img": "https://ugc.nikeid.com/is/image/nike/ugc/287164203.tif"
      }
    ]
    this.product = this.products[0];
  }

  close(msg) {
    alert(msg);
  }

  drop(event: any){
    debugger;
    const movingItem: Item = event.item.data;
    event.container.data.children[event.currentIndex] = movingItem;
  }

}