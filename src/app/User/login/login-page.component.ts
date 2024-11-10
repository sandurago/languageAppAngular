import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { User, UserLoginPayload } from '../../Interface/user';
import { Observable, map } from 'rxjs';
import { username } from '../../Store/user/user.selector';
import { saveUser } from '../../Store/user/user.actions';
import { UserService } from './create-user.service';

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
  hasAccount: string = "don't have";
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
    private router: Router,
    private userService: UserService,
  ){
    this.name$ = this.store.pipe(
      select('userStore'),
      map(state => username(state))
    );
  }

  /**
   * Changes the action from register to login and other way around.
   */
  changeAction():void {
    !this.isLogin ? this.router.navigateByUrl('/login') : this.router.navigateByUrl('/register');
  };

  hideError():void {
    this.message = '';
    const parent = this.input.nativeElement;
    parent.children[0].classList.remove('mdc-text-field--invalid');
  }

  /**
   * Prepares an object to send and to create/login the user
   */
  async createUser():Promise<void> {
    // Form an object to be sent
    const user = {
      username: this.FormGroup.get('username')?.value,
      name: this.FormGroup.get('name')?.value,
      email: this.FormGroup.get('email')?.value,
      password: this.FormGroup.get('password')?.value
    }

    const result = await this.userService.createUser(user as User)

    if (result.user !== null) {
      this.store.dispatch(saveUser(result.user));
      this.router.navigateByUrl('/dashboard');
    } else {
      this.message = result.message;
    }
  }

  async loginUser():Promise<void> {
    // Form an object to be sent
    const user = {
      username: this.FormGroup.get('username')?.value,
      password: this.FormGroup.get('password')?.value,
    }

    const result = await this.userService.loginUser(user as UserLoginPayload)

    if (result.user !== null) {
      this.store.dispatch(saveUser(result.user));
      this.router.navigateByUrl('/dashboard');
    } else {
      this.message = result.message;
    }
  };

  ngOnInit(): void {
    if (this.router.url === '/login') {
      this.isLogin = true;
      this.linkAction = 'register';
      this.hasAccount = "don't have";
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
