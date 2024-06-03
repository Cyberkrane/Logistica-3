import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Entry/interfaces/products.interface';
import { TableService } from 'src/app/Entry/services/table.service';
import { AlertService } from '../../services/alert.service';
import { ValidatorService } from '../../services/validator.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() title: string = '';

  product_form: FormGroup = this.fb.group({
    id: ['',[Validators.required, Validators.minLength(4)]],
    name: ['', [Validators.required, Validators.minLength(5)]],
    benefits: ['', [Validators.required, Validators.minLength(5)]],
    IdealFor: ['', [Validators.required, Validators.minLength(5)]],
    price: ['', [Validators.required, Validators.minLength(2)]],
    stock: ['', [Validators.required, Validators.min(1)]]
  });
  errorMessage: string | null = null;
  formEnabled: boolean = false;
 

  constructor(private fb: FormBuilder,
    private tableService: TableService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private validatorService: ValidatorService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.tableService.getProductById(productId).subscribe(product => {
          if (product) {
            this.fillForm(product);
          }
        });
      }
    });
  }

  
  isValidField(field: string) {
    return this.validatorService.isValidField(this.product_form, field)
  }

  getFieldError(field: string) {
    if(!this.product_form.controls[field]) return null;
    const errors = this.product_form.controls[field].errors || {};

    for(const key of Object.keys(errors)){
      switch( key ) {
        case 'required':
          return 'Este campo es requerido.';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres. `
      }
    }
    return null;
  }

  onSubmit() {
    if (this.title === 'Edit Product' && this.product_form.valid) {
      this.editProduct(this.product_form.value.id);
    } else {
      this.saveProduct();
    }
  }

  saveProduct() {
    if (this.product_form.invalid) return;
    this.tableService.addNewProducts(this.product_form.value).subscribe(
      data => {
        this.alertService.alertOrange('Se ha guardado correctamente')
      },
      error => {
        this.errorMessage = error;
        this.alertService.alertDanger(error)
      }
    )
    this.product_form.reset();
    this.router.navigate(['stock'])
  }

  

  editProduct(id: string) {
    const updatedProduct = this.product_form.value;
    updatedProduct.id = this.product_form.value.id;

    this.tableService.updateProduct(id, updatedProduct).subscribe(
      data => {
        this.alertService.alertSuccess('Se ha actualizado correctamente')
      },
      error => {
        this.errorMessage = error;
        this.alertService.alertDanger(error)
      }
    );
    this.router.navigate(['stock'])

  }

  fillForm(product: IProduct) {
    this.product_form.patchValue({
      id: product.id,
      name: product.name,
      benefits: product.benefits,
      IdealFor: product.IdealFor,
      price: product.price,
      stock: product.stock,

    });
  }

}
