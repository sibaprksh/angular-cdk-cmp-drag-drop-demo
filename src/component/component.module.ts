import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';

export const components = [
  {clazz: ProductsComponent},
  {clazz: ProductComponent},
]

@NgModule({
  imports: [
    CommonModule, DragDropModule
  ],
  declarations: [ProductsComponent, ProductComponent],
  exports: [],
  entryComponents: components.map((c)=>c.clazz)
})
export class ComponentModule { }


