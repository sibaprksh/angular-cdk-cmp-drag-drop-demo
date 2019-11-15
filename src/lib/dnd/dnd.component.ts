import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray, copyArrayItem, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dnd',
  templateUrl: './dnd.component.html',
  styleUrls: ['./dnd.component.css']
})
export class DndComponent implements OnInit {



  constructor() { }

  ngOnInit() {
  }

  @Input() item: any;
  // @Input() listIds: any;

  // drop(event: CdkDragDrop<string[]>) {     
  //     if (event.previousContainer === event.container) {
  //       moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //     } else {
  //         transferArrayItem(event.previousContainer.data,
  //                           event.container.data,
  //                           event.previousIndex,
  //                           event.currentIndex);
  //       }
  // }

}