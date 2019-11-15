import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragComponent } from './drag/drag.component';
import { DropComponent } from './drop/drop.component';
import { DndComponent } from './dnd/dnd.component';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule
  ],
  declarations: [DragComponent, DropComponent, DndComponent],
  exports: [DragComponent, DropComponent, DndComponent],
})
export class LibModule { }