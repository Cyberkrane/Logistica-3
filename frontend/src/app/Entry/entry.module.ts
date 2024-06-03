import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryRoutingModule } from './entry-routing.module';
import { StockComponent } from './pages/stock/stock.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    StockComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    EntryRoutingModule,
    SharedModule
  ]
})
export class EntryModule { }
