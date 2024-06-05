import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/services/validator.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  auth_form: FormGroup = this.fb.group({
    id: ['',[Validators.required, Validators.minLength(4)]],
    firt_name: ['',[Validators.required]],
    last_name: ['',[Validators.required]],
    userName:[''],
    password:[''],
    confirm_password:[''],
    roleID:[''],
});

  @Input()  title: string = 'Si estas leyendo esto es porque algo salio mal.';

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService
  ){}

  getFieldError(field: string) {
    if(!this.auth_form.controls[field]) return null;
    const errors = this.auth_form.controls[field].errors || {};

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
  isValidField(field: string) {
    return this.validatorService.isValidField(this.auth_form, field)

  }

  onSubmit() {
   console.log('Enviando datos al form');
  }

  editUser(id: string) {
    console.log('Editando......', id);
  }

  loginUser() {
    console.log(this.auth_form.value);
  }

}
