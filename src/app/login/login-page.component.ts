import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { User } from '../interface/user';
import { Observable, map } from 'rxjs';
import { nickname, name, password } from '../store/user/user.selector';
import { saveUser } from '../store/user/user.actions';
import { state } from '@angular/animations';

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
  // Here we declare our observables that will keep track of values in the state and change them
  userNickname$:Observable<string>;
  userName$:Observable<string | undefined>;
  userPassword$:Observable<string>;
  message:string = '';

  // CONSTRUCTOR
  constructor(private _formBuilder: FormBuilder, private store: Store<{ userStore: User }>,
    private route: ActivatedRoute, private router: Router){
      // Here we assign the values from the state to the observables
      this.userNickname$ = this.store.pipe(
        select('userStore'),
        map(state => nickname(state))
      )
      this.userName$ = this.store.pipe(
        select('userStore'),
        map(state => name(state))
      )
      this.userPassword$ = this.store.pipe(
        select('userStore'),
        map(state => password(state))
      )
    }

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
    } else {
      //window.history.replaceState({}, 'register', '/register');
      this.router.navigateByUrl('/register');
      this.isLogin = false;
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

    // Saves user data into userStore
    this.store.dispatch(saveUser({
      nickname: user.nickname as string,
      name: user.nickname as string,
      password: user.password as string
    }));


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

    const jsonStatus = await response.status;
    const jsonMessage = await response.json();

    if (jsonStatus == 200 || jsonStatus == 201) {
      this.router.navigateByUrl('/display');
    } else {
      this.message = jsonMessage.message;
    }
  }
}
