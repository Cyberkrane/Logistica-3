import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { UserService } from '../../services/user.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';

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
    userName:['',[Validators.required, Validators.minLength(4)]],
    password:['',[Validators.required, Validators.minLength(8)]],
    confirm_password:[''],
    roleID:['',[Validators.required]],
});

  @Input()  title: string = 'Si estas leyendo esto es porque algo salio mal.';

  errorMessage: string = '';
  form_notValid: boolean = true;

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private userService: UserService,
              private alertService: AlertService,
              private router: Router
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

  loginFieldsValid(username: string, password: string ){
    this.getFieldError(username);
    if(username !== '' && password !== ''){
      return this.form_notValid = false
    }
    return this.form_notValid = true
  }

  onSubmit() {
   console.log('Enviando datos al form');
  }


  loginUser() {
      const user = this.auth_form.controls['userName'].value;
      this.userService.getUserById(user).subscribe(
        data => {
          console.log(data.userName);
        }
      )
  }

  saveUser() {
    if (this.auth_form.invalid) return;
    this.userService.addNewUser(this.auth_form.value).subscribe(
      data => {
        this.alertService.alertOrange('Se ha guardado correctamente')
      },
      error => {
        this.errorMessage = error;
        this.alertService.alertDanger(error)
      }
    )
    this.auth_form.reset();
    this.router.navigate(['Login'])

  }


}
