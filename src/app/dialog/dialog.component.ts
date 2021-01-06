import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormFieldTypes } from '@aws-amplify/ui-components';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit {
  isLogged: boolean;
  formFields: FormFieldTypes;

  constructor() {
    this.formFields = [
      {
        type: "username",
        label: "Username*",
        placeholder: "Username",
        required: true,
      },
      {
        type: "password",
        label: "Password*",
        placeholder: "Password",
        required: true,
      },
      {
        type: "email",
        label: "Email Address*",
        placeholder: "Email",
        required: true,
      },
    ];
  }

  ngOnInit(): void {

  }

}
