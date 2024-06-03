import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent {

  @Input() item: string = '';

  constructor(private router: Router){}

  addProduct() {
    this.router.navigate(['add-product'])
  }
}
