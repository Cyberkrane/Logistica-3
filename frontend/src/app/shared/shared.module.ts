import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { HomeButtonComponent } from './components/home-button/home-button.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TruncatePipe } from './pipes/truncate.pipe';
import { AlertsComponent } from './components/alerts/alerts.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';


@NgModule({
  declarations: [
    TableComponent,
    FormComponent,
    AddButtonComponent,
    HomeButtonComponent,
    HeaderComponent,
    FooterComponent,
    TruncatePipe,
    AlertsComponent,
    DialogBoxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    HeaderComponent,
    TableComponent,
    FormComponent,
    FooterComponent,
    TruncatePipe,
    AlertsComponent
  ]
})
export class SharedModule { }
