import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragComponent } from './drag/drag.component';
import { DropComponent } from './drop/drop.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DragComponent, DropComponent],
  exports: [DragComponent, DropComponent],
})
export class LibModule { }