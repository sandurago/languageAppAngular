import { Component, SimpleChange } from '@angular/core';
import { setVerbs } from './Store/verbs/verbs.actions';
import { Store } from '@ngrx/store';
import { VerbState } from './Store/verbs/verbs.reducer';
import { HttpClient } from '@angular/common/http';
import { Verbs } from './Interface/verbs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** RETURN DATA */
  title = 'language-app';
  private URL = 'http://localhost:5000/verbs/verbslist';
  pageUrl:string = '';
  urlChange: boolean = false;

  /** CONSTRUCTOR */
  constructor(private httpClient: HttpClient, private router: Router, private store: Store<{ verbsStore: VerbState }>) {
    router.events.pipe(
      // We filter navigation events to have the one when navigation ends succesfully
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      // We subscribe to this value to listen for changes
    ).subscribe((event: NavigationEnd) => {
      if (event.url !== this.pageUrl) {
        this.urlChange = true;
        this.pageUrl = event.url;
      }
      setTimeout(() => {
        this.urlChange = false;
      }, 500);
    });
  }

  /** METHODS */
  ngOnInit() {
  //   // at the start of an app we do http request to load verbs in the store
    this.httpClient.get<Array<Verbs>>(this.URL).subscribe((verbs) => {
      this.store.dispatch(setVerbs({ allVerbs: verbs}))
    })
  }

  // ngOnChanges(changes: SimpleChange) {
  //   console.log(changes);
  // }
}
