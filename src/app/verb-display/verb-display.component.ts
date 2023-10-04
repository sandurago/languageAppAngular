import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { Verbs, VerbsList } from '../interface/verbs';
import { Store, select } from '@ngrx/store';
import { VerbState } from '../store/verbs/verbs.reducer';
import { congjuateThisVerb } from '../store/verbs/verbs.actions';
import { Observable, map } from 'rxjs';
import { verbsList } from '../store/verbs/verbs.selectors';

@Component({
  selector: 'app-verb-display',
  templateUrl: './verb-display.component.html',
  styleUrls: ['./verb-display.component.scss'],
})
export class VerbDisplayComponent {
  /** DATA */
  verbsNames:Array<string>;
  allVerbsList:Array<Verbs>;
  isHovered: boolean = false;
  hoveredElement:any = null;
  verbsList$:Observable<VerbsList>;

  /** CONSTRUCTOR */
  constructor(private store: Store<{ verbsStore: VerbState }>) {
    this.verbsList$ = this.store.pipe(
      select('verbsStore'),
      //verbsList is coming from selectors
      map(state => verbsList(state))
    );
  };

  /** METHODS */
  ngOnInit() {
    this.verbsList$.subscribe((verbs)=> {
      let values = Object.values(verbs);
      this.verbsNames = Object.keys(verbs);
      this.allVerbsList = values;
    });
  }
  /** Sorts verbs */
  onCompare(_left: KeyValue<string, string>, _right: KeyValue<string, string>): number {
    return 1;
  }
  /** Dispatches and action to add this verb to the store */
  practiceThisVerb(verb: string) {
    // first 'verb' is the key (verbs.actions) and second 'verb' is the argument
    this.store.dispatch(congjuateThisVerb({ verb: verb }));
  }
}
