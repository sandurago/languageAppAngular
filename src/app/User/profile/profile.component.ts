import { Component, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { MostPracticedVerbs, User } from 'src/app/Interface/user';
import { id, createdAt, email, lastLogin, name, username } from 'src/app/Store/user/user.selector';
import moment from 'moment';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
  name$:Observable<string>;
  name:string;
  username$:Observable<string>;
  username:string;
  email$:Observable<string>;
  email:string;
  createdAt$:Observable<string>;
  createdAt:string;
  lastLogin$:Observable<string>;
  lastLogin:string;
  id$:Observable<number>;
  id:number;
  data:MostPracticedVerbs[] = [];
  chartParentWidth:number;
  chartParentHeight:number;

  constructor(
    private store: Store <{userStore: User}>,
    private chart: ElementRef,
    private profileService: ProfileService,
  ) {
    this.name$ = this.store.pipe(
      select('userStore'),
      map(state => name(state))
    )
    this.username$ = this.store.pipe(
      select('userStore'),
      map(state => username(state))
    )
    this.email$ = this.store.pipe(
      select('userStore'),
      map(state => email(state))
    )
    this.createdAt$ = this.store.pipe(
      select('userStore'),
      map(state => createdAt(state))
    )
    this.lastLogin$ = this.store.pipe(
      select('userStore'),
      map(state => lastLogin(state))
    )
    this.id$ = this.store.pipe(
      select('userStore'),
      map(state => id(state))
    )
  }

  async getMostPracticedVerbs() {

    const result = await this.profileService.getMostPracticedVerbs(this.id);

    this.data = result.map((data: {name: string, practice_time: number}) => {
      return { name: data.name, value: data.practice_time };
    })
  }

  ngAfterContentInit() {
    this.chartParentWidth = this.chart.nativeElement.offsetWidth;
    this.chartParentHeight = this.chart.nativeElement.offsetHeight;
  }

  ngOnInit() {
    this.name$.subscribe((name) => {
      this.name = name;
    })

    this.username$.subscribe((username) => {
      this.username = username;
    })

    this.email$.subscribe((email) => {
      if (!email) {
        this.email = 'none';
      } else {
        this.email = email;
      }
    })

    this.id$.subscribe((id) => {
      this.id = id;
    })

    this.createdAt$.subscribe((createdAt) => {
      this.createdAt = moment(createdAt, 'DD/MM/YYYY HH:mm:ss').format('MMMM Do YYYY');
    })

    this.lastLogin$.subscribe((lastLogin) => {
      this.lastLogin = lastLogin;
    })

    this.getMostPracticedVerbs();

    //this.data = [{ name: 'avoir', value: 31}, { name: 'vouloir', value: 16}, { name: 'prendre', value: 11}, { name: 'mettre', value: 26}, { name: 'etre', value: 6}];
  }
}
