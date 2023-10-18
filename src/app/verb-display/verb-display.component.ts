import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Verbs } from '../interface/verbs';
import { Store, select } from '@ngrx/store';
import { VerbState } from '../store/verbs/verbs.reducer';
import { congjuateThisVerb } from '../store/verbs/verbs.actions';
import { Observable, map } from 'rxjs';
import { verbsList } from '../store/verbs/verbs.selectors';
import { PageEvent } from '@angular/material/paginator';

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
  verbsList$:Observable<Array<Verbs>>;
  start:number = 0;
  end:number = 10;

  /** CONSTRUCTOR */
  constructor(private store: Store<{ verbsStore: VerbState }>) {
    this.verbsList$ = this.store.pipe(
      select('verbsStore'),
      //verbsList is coming from selectors
      map(state => verbsList(state))
    );
  };

  handlePageEvent(e:PageEvent) {
    console.log(e);
    if(e.previousPageIndex !== undefined) {
      if (e.pageIndex > e.previousPageIndex) {
        this.start+=10;
        this.end+=10;
      } else {
        this.start-=10;
        this.end-=10;
      }
    }
  }

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
