import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Verbs } from '../../Interface/verbs';
import { Store, select } from '@ngrx/store';
import { VerbState } from '../../store/verbs/verbs.reducer';
import { congjuateThisVerb } from '../../store/verbs/verbs.actions';
import { Observable, map } from 'rxjs';
import { verbsList } from '../../store/verbs/verbs.selectors';
import { PageEvent } from '@angular/material/paginator';
import { Color } from '../../store/colors/colors.reducer';
import { gradient } from '../../store/colors/colors.selector';

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
  end:number = 6;
  gradient$:Observable<number>;
  gradient:number;
  pageIndexBigger:boolean;

  /** CONSTRUCTOR */
  constructor(private store: Store<{ verbsStore: VerbState }>, private colorStore: Store<{ colorStore: Color}>) {
    this.verbsList$ = this.store.pipe(
      select('verbsStore'),
      //verbsList is coming from selectors
      map(state => verbsList(state))
    );

    this.gradient$ = this.colorStore.pipe(
      select('colorStore'),
      map(state => gradient(state))
    )
  };

  handlePageEvent(e:PageEvent) {
    if(e.previousPageIndex !== undefined) {
      if (e.pageIndex > e.previousPageIndex) {
        this.pageIndexBigger = false;
        this.start+= 6;
        this.end+= 6;
      } else {
        this.pageIndexBigger = true;
        this.start-= 6;
        this.end-= 6;
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

    this.gradient$.subscribe((value) => {
      this.gradient = value
    })
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
