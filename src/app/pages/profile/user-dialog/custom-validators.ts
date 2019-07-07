import { AbstractControl, ValidatorFn } from '@angular/forms';

export function oldPassConfirm(password: string): ValidatorFn {
  return (control: AbstractControl) => {
    console.log(control);
    // if (!control || !control.parent) {
    //   return null;
    // }
    return control.value === control.parent.get(password).value ? null : { oldMismatch: true };
  };
}

export function passDontMatch(oldPassword: string): ValidatorFn {
  return (control: AbstractControl) => {
    console.log(control);
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(oldPassword).value !== control.value ? null : { match: true };
  };
}

export function newPassConfirm(newPassword: string): ValidatorFn {
  return (control: AbstractControl) => {
    console.log(control);
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(newPassword).value === control.value ? null : { newMismatch: true };
  };
}
