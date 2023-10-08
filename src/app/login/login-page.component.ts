import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  // DATA
  @Input() icon:string = '';
  @Input() action:string = '';
  @Input() linkAction:string = '';
  @Input() hasAccount:string = '';
  @Input() isLogin:boolean;

  @Output() actionEvent = new EventEmitter();

  url:string = 'http://localhost:8000';

  // CONSTRUCTOR
  constructor(private _formBuilder: FormBuilder, private httpClient: HttpClient,
    private route: ActivatedRoute, private router: Router){}

  // METHODS
  FormGroup = this._formBuilder.group({
    nickname: ['', Validators.required],
    name: [''],
    password: ['', Validators.required]
  })

  /**
   * Changes the action from register to login and other way around.
   */
  changeAction() {
    // emits this action to the main-page component
    this.actionEvent.emit();

    if (!this.isLogin) {
      //window.history.replaceState({}, 'login', '/login');
      this.router.navigateByUrl('/login');
      this.isLogin = true;
      this.route.url.subscribe((params) => {
      })
    } else {
      //window.history.replaceState({}, 'register', '/register');
      this.router.navigateByUrl('/register');
      this.isLogin = false;
      this.route.url.subscribe((params) => {
      })
    };
  }

  /**
   * Prepares an object to send and to create/login the user
   */
  async createUser() {
    // Variable for url
    let userURL:string;
    // Form an object to be sent
    const user = {
      nickname: this.FormGroup.get('nickname')?.value,
      name: this.FormGroup.get('name')?.value,
      password: this.FormGroup.get('password')?.value
    }

    // If user chose to login delete name from payload and use correct url.
    if (this.isLogin) {
      delete user.name;
      userURL = this.url + '/login';
    } else {
      userURL = this.url + '/create';
    }

    const response = await fetch(userURL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(user)
    })

    console.log(response);
    console.log(userURL);

    // HAVE TO FINISH THIS WHAT TO DO WITH THAT?
    const json = await response.json();
    console.log(json);
  }
}
