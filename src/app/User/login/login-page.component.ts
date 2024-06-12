import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { User } from '../../Interface/user';
import { Observable, map } from 'rxjs';
import { id, nickname, name, password } from '../../store/user/user.selector';
import { saveUser } from '../../store/user/user.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  @ViewChild('input', { read: ElementRef, static:false }) input: ElementRef;
  constructor(
    private _formBuilder: FormBuilder,
    private store: Store<{ userStore: User }>,
    private router: Router
  ){
    // Here we assign the values from the state to the observables
    this.userId$ = this.store.pipe(
      select('userStore'),
      map(state => id(state))
    )
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

  url:string = 'http://localhost:5000/user';
  // Here we declare our observables that will keep track of values in the state and change them
  userId$:Observable<number>;
  userNickname$:Observable<string>;
  userName$:Observable<string>;
  userPassword$:Observable<string>;

  message:string = '';
  animateClass:string;
  backInDown:boolean;
  backInUp:boolean;
  isLogin:boolean = true;
  linkAction:string = 'register';
  hasAccount:string = 'don\'t have';
  action:string = 'login';

  // Values from form
  FormGroup = this._formBuilder.group({
    nickname: ['', Validators.required],
    name: ['', Validators.required],
    password: ['', Validators.required]
  })

  /**
   * Changes the action from register to login and other way around.
   */
  changeAction() {
    !this.isLogin ? this.router.navigateByUrl('/login') : this.router.navigateByUrl('/register');
  };

  hideError() {
    this.message = '';
    const parent = this.input.nativeElement;
    parent.children[0].classList.remove("mdc-text-field--invalid");
    console.log(parent.children[0].classList);
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
    console.log(nickname + ' ' + name);

    // If user chose to login delete name from payload and use correct url.
    if (this.isLogin) {
      delete user.name;
      userURL = this.url + '/login';
    } else {
      userURL = this.url + '/register';
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
    console.log(JSON.stringify(user));
    console.log(userURL);

    const jsonStatus = await response.status;
    const jsonMessage = await response.json();

    if (jsonStatus == 200 || jsonStatus == 201) {
      // Saves user data into userStore
      this.store.dispatch(saveUser({
        id: jsonMessage.id,
        nickname: user.nickname as string,
        name: user.name as string,
        password: user.password as string,
        created_at: jsonMessage.created_at,
        last_login: jsonMessage.last_login,
        login: true
      }));
      this.router.navigateByUrl('/dashboard');
    } else {
      this.message = jsonMessage.message;
    }
  }

  ngOnInit() {
    if (this.router.url === '/login') {
      this.isLogin = true;
      this.linkAction = 'register';
      this.hasAccount = 'don\t have';
      this.action = 'login';
    } else {
      this.isLogin = false;
      this.linkAction = 'login';
      this.hasAccount = 'have';
      this.action = 'register';
    }
  }
}
