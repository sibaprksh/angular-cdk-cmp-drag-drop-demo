import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop } from "@angular/cdk/drag-drop";

import { DropComponent, Item, DndService } from '../../lib';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  @Input() item: Item;
  @Output() itemDrop: EventEmitter<any> = new EventEmitter();

  connectedDropListsIds = [];
  currentInstance: any;

  loadPlaceholders() { 
    if(this.item.children.length == 0){ 
      //this.item.children = [new Item({name: 'placeholder-1'}), new Item({name: 'placeholder-2'})];
      this.itemDrop.emit({ type: 'placeholder', item: this.item });
      this.itemDrop.emit({ type: 'placeholder', item: this.item });
      //this.itemDrop.emit({ type: 'placeholder', item: this.item });

      // setTimeout(()=>{
      //   this.item.children = [new Item({name: 'placeholder-1'}), new Item({name: 'placeholder-2'})];
      // },100)
    }
  }

  products: Array<any> = [];  
  product: Object = {};
  
  constructor(public service : DndService) {
    this.service.ids.subscribe((ids: string[])=>this.connectedDropListsIds=ids);
  }

  public onDelete(item: Item, subItem: Item): void {
    item.children = item.children.filter((item)=>item.uId != subItem.uId)
  }

  public onDrop(event:  CdkDragDrop<Item>): void { 
    alert('I am here');
    this.itemDrop.emit(event); 
  }

  ngOnInit() { 
    //debugger; 
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