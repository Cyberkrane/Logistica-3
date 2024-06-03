import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

   public benefitsPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  // public firstNamePattern: string = '([a-zA-Z]+)';
  // public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


  // public cantBeLegion = (control: FormControl): ValidationErrors | null => {

  //   const value: string = control.value.trim().toLowerCase();

  //   if (value === 'legion') {
  //     return { cantBeLegion: true };
  //   }

  //   return null;
  // }

  // Funciones helper isValidField
  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }
}
