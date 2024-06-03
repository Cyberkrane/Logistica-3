import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './pages/stock/stock.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { AddProductComponent } from './pages/add-product/add-product.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {path:'stock', component: StockComponent},
      {path: 'edit-product', component: EditProductComponent},
      {path: 'add-product', component: AddProductComponent},
      {path: '**', redirectTo: 'stock'}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule { }
