import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../models/item';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss']
})
export class DragComponent {
  @Input() item: Item;
  @Input() parentItem?: Item;
  @Input() public set connectedDropListsIds(ids: string[]) {
    this.allDropListsIds = ids;
  }
  public get connectedDropListsIds(): string[] {
    return this.allDropListsIds.filter((id) => id !== this.item.uId);
  }
  public allDropListsIds: string[];

  public get dragDisabled(): boolean {
    return !this.parentItem;
  }

  public get parentItemId(): string {
    return this.dragDisabled ? '' : this.parentItem.uId;
  }


  @Output() itemDrop: EventEmitter<CdkDragDrop<Item>> = new EventEmitter();
  @Output() itemDelete: EventEmitter<Item> = new EventEmitter();

  constructor() {
    this.allDropListsIds = [];
  }

  public onDragDrop(event: CdkDragDrop<Item, Item>): void {
    //debugger;
    this.itemDrop.emit(event);
  }

  public onDelete(item: Item): void {
    this.itemDelete.emit(item);
  }
}