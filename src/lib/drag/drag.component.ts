import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../models/item';

import { DndService } from '../dnd.service';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss']
})
export class DragComponent {
  @Input() item: Item;
  @Input() parentItem?: Item;
  
  connectedDropListsIds: string[];

  public get dragDisabled(): boolean {
    return !this.parentItem;
  }

  public get parentItemId(): string {
    return this.dragDisabled ? '' : this.parentItem.uId;
  }


  @Output() itemDrop: EventEmitter<CdkDragDrop<Item>> = new EventEmitter();
  @Output() itemDelete: EventEmitter<Item> = new EventEmitter();

  constructor(public service : DndService) {
    this.service.ids.subscribe((ids: string[])=>this.connectedDropListsIds=ids);
  }

  public onDragDrop(event: CdkDragDrop<Item, Item>): void {
    //debugger;
    this.itemDrop.emit(event);
  }

  public onDelete(item: Item): void {
    this.itemDelete.emit(item);
  }
}