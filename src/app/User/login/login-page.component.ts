import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { User } from '../../Interface/user';
import { Observable, map } from 'rxjs';
import { username } from '../../Store/user/user.selector';
import { saveUser } from '../../Store/user/user.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  @ViewChild('input', { read: ElementRef, static:false }) input: ElementRef;
  url: string = 'http://localhost:5000/user';

  message: string = '';
  animateClass: string;
  backInDown: boolean;
  backInUp: boolean;
  isLogin: boolean = true;
  linkAction: string = 'register';
  hasAccount: string = 'don\'t have';
  action: string = 'login';
  name$: Observable<string>;
  name: any;

  // Values from form
  FormGroup = this._formBuilder.group({
    username: ['', Validators.required],
    name: ['', Validators.required],
    email: [''],
    password: ['', Validators.required],
  })

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store<{userStore: User}>,
    private router: Router
  ){
    this.name$ = this.store.pipe(
      select('userStore'),
      map(state => username(state))
    );
  }

  /**
   * Changes the action from register to login and other way around.
   */
  changeAction() {
    !this.isLogin ? this.router.navigateByUrl('/login') : this.router.navigateByUrl('/register');
  };

  hideError() {
    this.message = '';
    const parent = this.input.nativeElement;
    parent.children[0].classList.remove('mdc-text-field--invalid');
  }

  /**
   * Prepares an object to send and to create/login the user
   */
  async createUser() {
    // Variable for url
    let userURL:string;
    // Form an object to be sent
    const user = {
      username: this.FormGroup.get('username')?.value,
      name: this.FormGroup.get('name')?.value,
      email: this.FormGroup.get('email')?.value,
      password: this.FormGroup.get('password')?.value
    }
      userURL = this.url + '/register';

    const response = await fetch(userURL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(user)
    })

    const jsonStatus = await response.status;
    const jsonMessage = await response.json();

    if (jsonStatus == 200 || jsonStatus == 201) {
      // Saves user data into userStore
      this.store.dispatch(saveUser({
        id: jsonMessage.id,
        username: user.username as string,
        name: user.name as string,
        email: user.email as unknown as string,
        password: user.password as string,
        createdAt: jsonMessage.createdAt,
        lastLogin: jsonMessage.lastLogin,
        login: true,
        loginDays: [],
        previousTasks: [],
      }));
      this.router.navigateByUrl('/dashboard');
    } else {
      this.message = jsonMessage.message;
    }
  }

  async loginUser() {
    // Variable for url
    let userURL:string;
    // Form an object to be sent
    const user = {
      username: this.FormGroup.get('username')?.value,
      password: this.FormGroup.get('password')?.value,
    }

    userURL = this.url + '/login';

    const response = await fetch(userURL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(user)
    });

    const jsonStatus = await response.status;
    const jsonMessage = await response.json();

    if (jsonStatus == 200 || jsonStatus == 201) {
      // Saves user data into userStore
      this.store.dispatch(saveUser({
        id: jsonMessage.id,
        username: user.username as string,
        name: jsonMessage.name,
        email: jsonMessage.email,
        password: user.password as string,
        createdAt: jsonMessage.created_at,
        lastLogin: jsonMessage.login_time,
        login: true,
        loginDays: jsonMessage.login_days,
        previousTasks: jsonMessage.tasksWithFormattedDate,
      }));
      this.router.navigateByUrl('/dashboard');
    } else {
      this.message = jsonMessage.message;
    }
  };

  ngOnInit(): void {
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

    this.name$.subscribe((name) => (
      this.name = name
    ))
  }
}
