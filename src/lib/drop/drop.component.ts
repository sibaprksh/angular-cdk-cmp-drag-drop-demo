import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ViewContainerRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Item } from '../models/item';

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss']
})
export class DropComponent {  

  @ViewChild('target', {read: ViewContainerRef, static: true}) target;  

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
  
  constructor(private resolver: ComponentFactoryResolver) {
    this.allDropListsIds = [];
  }

  ngOnInit() {
    //debugger;
    this.loadComponent(this.item);
  }

  public onDelete(item: Item): void {
    this.parentItem.children = this.parentItem.children.filter((child) => child.uId !== item.uId); 
  }

  // data come from parent (@Input & @Output key values)
  @Input() parentInstance: any = {};
  // This component data
  public currentInstance: any = {};

  private loadComponent(item: Item) { 
    //debugger; 

    if(!item || !item.clazz) return;
    
    const factory = this.resolver.resolveComponentFactory(item.clazz);
    this.currentInstance = this.target.createComponent(factory).instance; 
             
    // binding to dynamic component (ParentComponent -> ChildComponent)
    for (var property in this.currentInstance) {
      if (this.currentInstance.hasOwnProperty(property)) {
        try{
          // bind @Output
          if(this.currentInstance[property] instanceof EventEmitter){
            //TODO: Check if memory lick when we delete this component
            this.currentInstance[property].subscribe(this.parentInstance[property]);
          }else{
            this.currentInstance[property] = this.parentInstance[property];
          }          
        }catch(err){
          console.warn(err);
        }
      }
    }

    this.currentInstance.item = item;
    this.currentInstance.parentItem = this.parentItem;
    this.currentInstance.connectedDropListsIds = this.connectedDropListsIds;
    this.currentInstance.parentInstance;
    this.currentInstance.itemDrop = this.itemDrop;
  }

}