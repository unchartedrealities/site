import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EmailService} from '../../Services/email.service';
import {ValidationService} from '../../Services/validation.service';
import {PhonePipe} from '../../Pipes/phone-pipe.pipe';
import * as compose from 'lodash/fp/compose';
import * as $ from 'jquery';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public phonePipe = new PhonePipe();
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
      subject: ['', Validators.required ],
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
      subject: ['Test Subject', Validators.required ],
      message: 'Test message'
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
      email: ['​info@unchartedrealities.com', Validators.required ]
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
    const phoneFormatter = new PhonePipe();
    switch (type) {
      case 'vendor':
        emailObj = Object.assign({html: ''}, this.vendorForm.value);
        emailObj.from = `${emailObj.email.trim()}`;
        emailObj.name = `${emailObj.firstName.trim() + ' ' + emailObj.lastName.trim()}`;
        emailObj.subject = `${emailObj.subject.trim()}`;
        emailObj.html = `\n
          <p><strong> From: </strong>: ${emailObj.firstName.trim() + ' ' + emailObj.lastName.trim()} </p>
          <p><strong> Phone: </strong> ${phoneFormatter.transform(emailObj.phone.trim())} </p>
          <p><strong> Company: </strong> ${emailObj.companyName.trim()} </p>
          <p><strong> Company Address: </strong> ${emailObj.companyAddress.trim()} </p>
          <p><strong> Product Type: </strong> ${emailObj.productType.trim()} </p>
          <p><strong> Message</strong> ${emailObj.message.trim()} </p>`;
        break;
      case 'visitor':
        emailObj = Object.assign({html: '', subject: 'Visitor Inquiry'}, this.visitorForm.value);
        emailObj.from = `${emailObj.email.trim()}`;
        emailObj.name = `${emailObj.firstName.trim() + ' ' + emailObj.lastName.trim()}`;
        emailObj.html = `
          <p><strong> From: </strong> ${emailObj.firstName.trim() + ' ' + emailObj.lastName.trim()} </p>
          <p><strong> Phone: </strong> ${phoneFormatter.transform(emailObj.phone.trim())} </p>
          <p><strong> Message: </strong> ${emailObj.message.trim()} </p>`;
        break;
      default:
        break;
    }
    return emailObj;
  }
  sendEmail(): void {
    const type = this.form;
    const emailObj: any = this.getEmailObj(type);
    this.emailService.sendEmail(emailObj);
  }
}
