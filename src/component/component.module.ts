import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { LibModule } from '../lib';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';

export const components = [
  {clazz: ProductsComponent},
  {clazz: ProductComponent},
]

@NgModule({
  imports: [
    CommonModule, DragDropModule, LibModule
  ],
  declarations: [ProductsComponent, ProductComponent],
  exports: [],
  entryComponents: components.map((c)=>c.clazz)
})
export class ComponentModule { }


