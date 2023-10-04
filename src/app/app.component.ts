import { Component } from '@angular/core';
import { setVerbs } from './store/verbs/verbs.actions';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { VerbState } from './store/verbs/verbs.reducer';
import { HttpClient } from '@angular/common/http';
import { VerbsList } from './interface/verbs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** RETURN DATA */
  title = 'language-app';
  private URL = 'http://localhost:8000/verbs';

  /** CONSTRUCTOR */
  constructor(private httpClient: HttpClient, private store: Store<{ verbsStore: VerbState }>) {}

  /** METHODS */
  ngOnInit() {
    // at the start of an app we do http request to load verbs in the store
    this.httpClient.get<VerbsList>(this.URL).subscribe((verbs) => {
      this.store.dispatch(setVerbs({ allVerbs: verbs}))
    })
  }
}
