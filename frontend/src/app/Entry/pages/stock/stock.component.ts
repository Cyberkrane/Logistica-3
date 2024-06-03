import { Component, OnInit } from '@angular/core';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit{

  title: string = 'Stock';

  registros: any[] = [];
  headers: string[] = [];
  item: string = 'Product';

  constructor(private tableService: TableService){}

  ngOnInit(): void {
    this.showAllProducts();
  }

  showAllProducts(){
    this.tableService.getAllProducts().subscribe(
      data => {
        this.registros = data;
        this.headers = Object.keys(this.registros[0])      
      }
    )
  }

}
