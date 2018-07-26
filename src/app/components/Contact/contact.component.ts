import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EmailService} from '../../Services/email.service';
import {ValidationService} from '../../Services/validation.service';
import * as compose from 'lodash/fp/compose';
import * as $ from 'jquery';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  form = 'visitor'; // visitor, or vendor
  visitorForm: FormGroup;
  vendorForm: FormGroup;
  activeForm: FormGroup;
  contactForm: FormGroup;
  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.createVisitorForm();
    this.createVendorForm();
    this.createContactForm();
    this.activeForm = this.visitorForm;
  }
  toggleForm(formType): void {
    /*
      + Change view based on user clicking 'Visitor' or 'Vendor' button
    */
   this.form = formType;
    switch (formType) {
      case 'visitor':
        this.activeForm = this.visitorForm;
        break;
      case 'vendor':
        this.activeForm = this.vendorForm;
        break;
      default:
        break;
    }
  }
  createVisitorForm(): void {
    this.visitorForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      phone: ['', [Validators.required, ValidationService.phoneNumberValidator ]],
      message: '',
    },
    );
  }
  testCreateVisitorForm(): void {
    this.visitorForm = this.fb.group({
      firstName: ['Test', Validators.required ],
      lastName: ['User', Validators.required ],
      email: ['testEmail@email.com', [Validators.required, ValidationService.emailValidator]],
      phone: ['8004354455', [Validators.required, ValidationService.phoneNumberValidator ]],
      message: 'Test message',
    },
    );
  }
  createVendorForm(): void {
    this.vendorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required ],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      phone: ['', [Validators.required, ValidationService.phoneNumberValidator ]],
      companyName: ['', Validators.required ],
      companyAddress: ['', [Validators.required, ValidationService.addressValidator ]],
      productType: ['', Validators.required ],
      subject: ['', Validators.required ],
      message: ['', Validators.required ]
    });
  }
  createContactForm(): void {
    this.contactForm = this.fb.group({
      address: ['933 SW 3rd Ave, Portland, OR', Validators.required ],
      phone: ['(844)633-0075', Validators.required ],
      email: ['​info@unchartedrealities.com', Validators.required ],
    });
  }
  getForm(type: string): FormGroup {
    let form = null;
    switch (type) {
      case 'visitor':
      form = this.visitorForm;
        break;
      case 'vendor':
      form = this.vendorForm;
        break;
      default:
        break;
    }
    // return deep copy of form
    return form;
  }
  trimForm(form: any): any {
    Object.keys(form).forEach((key) => this.form[key] = this.form[key].trim());
    return form;
  }
  testEmail(): void {

  }
  getEmailObj(type: string): any {
    let emailObj: any = null;
    switch (type) {
      case 'vendor':
        emailObj = Object.assign({html: ''}, this.vendorForm.value);
        emailObj.html = `\n
              From: ${emailObj.firstName.trim() + ' ' + emailObj.lastName.trim()} \n
                Phone: ${emailObj.phone.trim()} \n
                Message: ${emailObj.message.trim()} \n
                Company: ${emailObj.companyName.trim()} \n
                Company Address: ${emailObj.companyAddress.trim()} \n
                Product Type: ${emailObj.productType.trim()} \n
                Message: ${emailObj.message.trim()}`;
        break;
      case 'visitor':
        emailObj = Object.assign({html: '', subject: 'Visitor Inquiry'}, this.visitorForm.value);
        emailObj.html = `\n
                From: ${emailObj.firstName.trim() + ' ' + emailObj.lastName.trim()} \n
                Phone: ${emailObj.phone.trim()} \n
                Message: ${emailObj.message.trim()}`;
        break;
      default:
        break;
    }
    return emailObj;
  }
  sendEmail(): void {
    const type = this.form;
    const emailObj: any = this.getEmailObj(type);
    alert('Email service is coming soon! Please feel free to give us a call at (844)633-0075');
    // this.emailService.sendEmail(emailObj);
  }
}
