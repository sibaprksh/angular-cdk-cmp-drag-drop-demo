import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  EventEmitter
} from "@angular/core";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Item } from "../models/item";

import { DndService } from '../dnd.service';

@Component({
  selector: "app-drop",
  templateUrl: "./drop.component.html",
  styleUrls: ["./drop.component.scss"]
})
export class DropComponent {
  @Input() item: Item;  
  @Output() itemDrop: EventEmitter<CdkDragDrop<Item>> = new EventEmitter();

  connectedDropListsIds: string[];  

  constructor(public service : DndService) {
    this.service.ids.subscribe((ids: string[])=>this.connectedDropListsIds=ids);
  }

  ngOnInit() {
  }
  
  public onDrop(event:  CdkDragDrop<Item>): void { 
    this.itemDrop.emit(event); 
  }

  public onDelete(item: Item, subItem: Item): void {
    item.children = item.children.filter((item)=>item.uId != subItem.uId)
  }

  
}
