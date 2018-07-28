import { Pipe, PipeTransform } from '@angular/core';
import { parseNumber, formatNumber, ParsedNumber } from 'libphonenumber-js';
@Pipe({
  name: 'PhonePipe'
})
export class PhonePipe implements PipeTransform {
  transform(value: string , args?: string): any {
    const valid = this.validatePhoneNum(value);
    if (!valid) {
      return value;
    }
    const type = this.getType(value);
    let formNum = null;
    if (type === 'National') {
      formNum = formatNumber({ country: 'US', phone: value }, 'International');
    } else {
      const intPhoneNum =  `+${this.formatPhoneNum(value)}`;
      formNum = formatNumber(value, 'International');
    }
    return formNum;
  }
  validatePhoneNum(phoneNum) {
    if (!phoneNum) {
      return phoneNum;
    }
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    phoneNum = phoneNum.trim();
    if (!regex.test(phoneNum)) {
      return false;
    }
    return true;
  }
  getType(phoneNum) {
    if (phoneNum.length > 10) {
      return 'International';
    }
    return 'National';
  }
  formatPhoneNum(phoneNum) {
    return `${phoneNum.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ +?/g, '')}`;
  }
}
