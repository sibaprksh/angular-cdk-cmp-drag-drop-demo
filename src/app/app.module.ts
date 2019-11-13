import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { DragComponent } from './drag/drag.component';
import { DropComponent } from './drop/drop.component';

import { ComponentModule } from '../component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    DragDropModule,
    ComponentModule
  ],
  entryComponents: [
  ],
  declarations: [    
    AppComponent,    
    DragComponent, 
    DropComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: []
})
export class AppModule { }
