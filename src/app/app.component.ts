import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray, copyArrayItem, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';

import { Item, DropComponent, DndService } from '../lib';
import { components } from '../component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {    
  public item: Item;
  public done: Item;

  connectedDropListsIds: Array<string> = [];

  // public get connectedDropListsIds(): string[] {
  //   const itemIds = this.getIdsRecursive(this.item).reverse();
  //   const doneIds = this.getIdsRecursive(this.done).reverse();
  //   return itemIds.concat(doneIds);
  // }

  constructor( public service : DndService ) {
    this.service.ids.subscribe((ids: string[])=>this.connectedDropListsIds=ids);

    this.item = new Item({ name: 'Drag' });
    this.done = new Item({ name: 'Drop Area' }); 

    this.service.setIds([this.item.uId, this.done.uId]);
  }

  public ngOnInit() {
    components.forEach((component)=>{ 
      const item = new Item( Object.assign({}, component, { name: component.clazz.name }) );
      this.item.children.push(item);
      this.service.setId(item.uId);
    })
  }

  public onDragDrop( obj: any ){
    debugger;   

    if(obj.type == 'placeholder') {
      const newItem = new Item({name: 'placeholder'});
      
      setTimeout(()=>{
        debugger; 
        obj.item.children.push(newItem);        
        this.service.setId(newItem.uId);
      }, 100)
      return;
    }

    const event: CdkDragDrop<Item> = obj;
    const movingItem: Item = event.item.data;
    const data = this.getData(movingItem);
    data.children = []; // TODO: Check why nested component is droping
    const cloneItem = new Item(data);
    event.container.data.children.push(cloneItem);
    this.service.setId(cloneItem.uId);


    // event.container.element.nativeElement.classList.remove('active');
    // if (this.canBeDropped(event)) {
    //   const movingItem: Item = event.item.data;

    //   if(this.isFromDrag(movingItem)) {
    //     const data = this.getData(movingItem);
    //     data.children = []; // TODO: Check why nested component is droping
    //     //if(movingItem.clazz.prototype instanceof DropComponent){
    //     // if(movingItem.clazz.name == 'ProductsComponent'){ 
    //     //   data.children.push(new Item({name: 'placeholder'}));
    //     // }
    //     const cloneItem = new Item(data);
    //     event.container.data.children.push(cloneItem); 
    //   }else{
    //     event.container.data.children.push(movingItem);
    //     event.previousContainer.data.children = event.previousContainer.data.children.filter((child) => child.uId !== movingItem.uId); 
    //   }
    // } else {      
    //   moveItemInArray(event.container.data.children, event.previousIndex, event.currentIndex);
    // }
  }  

  private getIdsRecursive(item: Item): string[] {
    let ids = [item.uId];
    item.children.forEach((childItem) => { ids = ids.concat(this.getIdsRecursive(childItem)) });
    return ids;
  }

  private canBeDropped(event: CdkDragDrop<Item, Item>): boolean { 
    const movingItem: Item = event.item.data;

    return event.previousContainer.id !== event.container.id
      && this.isNotSelfDrop(event)
      && !this.hasChild(movingItem, event.container.data);
  }

  private isNotSelfDrop(event: CdkDragDrop<Item> | CdkDragEnter<Item> | CdkDragExit<Item>): boolean {
    return event.container.data.uId !== event.item.data.uId;
  }

  private hasChild(parentItem: Item, childItem: Item): boolean {
    const hasChild = parentItem.children.some((item) => item.uId === childItem.uId);
    return hasChild ? true : parentItem.children.some((item) => this.hasChild(item, childItem));
  }

  private isFromDrag(item: Item) {
    return this.item.children.some(childItem => childItem.uId === item.uId); 
  }

  private getData(obj: Item) {
    const cloned:any = {};
    for (var property in obj) {
      if (obj.hasOwnProperty(property) && ['uId'].indexOf(property) == -1) {
        cloned[property] = obj[property];
      }
    }
    return cloned;
  }
  
}
