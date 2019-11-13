import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<any> = [];
  product: Object = {};
  
  constructor() { }

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