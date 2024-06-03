import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TableService } from '../../../Entry/services/table.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  @Input() title: string = 'Si puedes leer esto, algo salió mal!!!';

  @Input() registros: any[] = [];
  @Input() headers: string[] = [];
  @Input() registerType: string = '';

  item: string = '';
  errorMessage: string | null = null;
  confirmationDialog = false;
  idHero = '0';
  constructor(private router: Router,
              private tableService: TableService,
              private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.item = this.registerType;
    // this.registerType = 'Product'

  }

  // MANEJO DE ERRORES
  private handleError(error: any): void {
    this.alertService.alertDanger(error.message);
    console.log(error.message);
  }

  showProducts(){
    this.tableService.getAllProducts().subscribe(
      data => {
        this.registros = data;  
        console.log(data)
      }
    )
  }

  editProduct(id: string){
    this.router.navigate(['edit-product'], { queryParams: { id }});
  }

  deleteProduct(id: string) {
    this.tableService.deleteProduct(id).subscribe(
      data => {
        this.showProducts();
        this.alertService.alertSuccess('Se ha borrado correctamente')
      },
      error => {
        this.errorMessage = error;
        this.alertService.alertDanger(error)
      }
    );
    this.tableService.getAllProducts().subscribe(
      Products => {
        this.registros = Products;
        this.alertService.alertWarning(`Product deleted id: ${id}`);
        this.confirmationDialog = false;
        if(this.confirmationDialog == false)this.showProducts();
        
      },
      error => {
        this.handleError(error);
      }
    )
  }

  goBack() {
    this.router.navigate([''])
  }

  cancela(){
    this.confirmationDialog = false;
  }

  llamarAlModal(id:string) {
    this.confirmationDialog = true;
    this.idHero = id;
  }

}
