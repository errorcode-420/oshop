import { AbstractControl } from '@angular/forms';

export function urlOrPathValidator(control: AbstractControl) {
  const value = control.value;
  if (value && value.trim() !== '') {
    const urlPattern = /^(https?:\/\/[^\s]+)|(\/[a-zA-Z0-9/-]+\.[a-zA-Z]{2,4})$/;
    return urlPattern.test(value) ? null : { invalidUrlOrPath: true };
  } else {
    return null;
  }
}
