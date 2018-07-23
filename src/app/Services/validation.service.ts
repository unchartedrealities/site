import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
        'required': 'Required',
        'invalidPhoneNum': 'Invalid phone number',
        'invalidEmailAddress': 'Invalid email address',
        'invalidAddress': 'Invalid street address',
        'minlength': `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }
  static emailValidator(control) {
    console.log(control.value);
    const email = control.value.trim();
    const regex =/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if ( email === '' || ! regex.test(email)) {
          return { 'invalidEmailAddress': true };
    }
    if (email.indexOf('.com') === -1) {
      return { 'invalidEmailAddress': true };
    }
      return null;
  }
  static phoneNumberValidator(control) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const phoneNum = control.value.trim();
    if (!regex.test(phoneNum)) {
      return {'invalidPhoneNum': true};
    }
    return null;
  }
  static addressValidator(control) {
    const regex = /^\d+\s[A-z]+\s[A-z]+/g;
    const address = control.value.trim();
    if (!regex.test(address)) {
      return {'invalidAddress': true};
    }
    return null;
  }
}
