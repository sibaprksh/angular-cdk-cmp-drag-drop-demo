import { Component, OnInit } from '@angular/core';

import { DropComponent } from '../../lib';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends DropComponent {

  products: Array<any> = [];
  product: Object = {};
  
  constructor() { super() }

  ngOnInit() { 
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

}