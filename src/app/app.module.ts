import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { LibModule } from '../lib';

import { ComponentModule } from '../component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    DragDropModule,
    ComponentModule,
    LibModule
  ],
  entryComponents: [
  ],
  declarations: [    
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: []
})
export class AppModule { }
