import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  // DATA
  // CONSTRUCTOR
  constructor(private _formBuilder: FormBuilder){}

  // METHODS
  FormGroup = this._formBuilder.group({
    nickname: ['', Validators.required],
    name: [''],
    password: ['', Validators.required]
  })
}
