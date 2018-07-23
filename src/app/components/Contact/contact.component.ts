import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EmailService} from '../../Services/email.service';
import {ValidationService} from '../../Services/validation.service';
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
      address: ['We will be located soon at 933 SW 3rd Ave, Portland, OR', Validators.required ],
      phone: ['(844)633-0075 - Call or Text Us!', Validators.required ],
      email: ['​info@unchartedrealities.com', Validators.required ],
    });
  }
  sendEmail(): void {
    const type = this.form;
    let emailObj: any = null;
    // Get rid of accidental trailing white spaces
    Object.keys(this.form).forEach((key) => this.form[key] = this.form[key].trim());
    switch (type) {
      case 'vendor':
        emailObj = Object.assign({html: ''}, this.vendorForm.value);
        emailObj.html = `\n
              From: ${emailObj.firstName + ' ' + emailObj.lastName} \n
                Phone: ${emailObj.phone} \n
                Message: ${emailObj.message} \n
                Company: ${emailObj.companyName} \n
                Company Address: ${emailObj.companyAddress} \n
                Product Type: ${emailObj.productType} \n
                Message: ${emailObj.message}`;
        break;
      case 'visitor':
        emailObj = Object.assign({html: '', subject: 'Visitor Inquiry'}, this.visitorForm.value);
        emailObj.html = `\n
                From: ${emailObj.firstName + ' ' + emailObj.lastName} \n
                Phone: ${emailObj.phone} \n
                Message: ${emailObj.message}`;
        break;
      default:
        break;
    }
    alert('Email service is coming soon! Please feel free to give us a call or text at (844)633-0075');
    // this.emailService.sendEmail(emailObj);
  }
}
