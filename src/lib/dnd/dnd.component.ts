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
import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray, copyArrayItem, transferArrayItem } from '@angular/cdk/drag-drop';

import { DndService, Item } from '../dnd.service';

@Component({
  selector: 'app-dnd',
  templateUrl: './dnd.component.html',
  styleUrls: ['./dnd.component.css']
})
export class DndComponent implements OnInit {

  @ViewChild("target", { read: ViewContainerRef, static: true }) target;

  constructor( private resolver: ComponentFactoryResolver, public service : DndService ) { }
 
  ngOnInit() {
    this.service.ids.subscribe((ids: string[])=>this.connectedDropListsIds=ids);
    this.loadComponent(this.item);
  } 

  public onDrop(event:  CdkDragDrop<Item>): void { 
    this.itemDrop.emit(event); 
  }

  @Input() item: any;
  connectedDropListsIds; 
  @Output() itemDrop: EventEmitter<CdkDragDrop<any>> = new EventEmitter();

  // data come from parent (@Input & @Output key values)
  @Input() parentInstance: any = {};
  // This component data
  public currentInstance: any = {};

  private loadComponent(item: any) {
    //debugger;

    if (!item || !item.clazz) return;

    const factory = this.resolver.resolveComponentFactory(item.clazz);
    this.currentInstance = this.target.createComponent(factory).instance;

    // binding to dynamic component (ParentComponent -> ChildComponent)
    for (var property in this.currentInstance) {
      if (this.currentInstance.hasOwnProperty(property)) {
        try {
          // bind @Output
          if (this.currentInstance[property] instanceof EventEmitter) {
            //TODO: Check if memory lick when we delete this component
            this.currentInstance[property].subscribe(
              this.parentInstance[property]
            );
          } else {
            this.currentInstance[property] = this.parentInstance[property];
          }
        } catch (err) {
          console.warn(err);
        }
      }
    }
    //debugger; 
    this.currentInstance.item = item;
    // this.currentInstance.parentItem = this.parentItem;
    //this.currentInstance.connectedDropListsIds = this.allDropListsIds;
    // this.currentInstance.parentInstance;
    if(this.currentInstance.itemDrop){
      this.currentInstance.itemDrop.subscribe((e)=>this.onDrop(e));
    }
  }


}