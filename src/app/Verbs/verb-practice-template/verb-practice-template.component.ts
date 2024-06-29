import { Component } from '@angular/core';
import { Verbs, VerbsList, VerbsCong } from '../../Interface/verbs';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { VerbState } from '../../Store/verbs/verbs.reducer';
import { currentVerb, selectVerb } from '../../Store/verbs/verbs.selectors';
import { KeyValue } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { User } from 'src/app/Interface/user';
import { id } from 'src/app/Store/user/user.selector';
import moment, { Moment } from 'moment';
import { VerbPracticeSummaryComponent } from '../verb-summary-dialog/verb-practice-summary.component';

@Component({
  selector: 'app-verb-practice-template',
  templateUrl: './verb-practice-template.component.html',
  styleUrls: ['./verb-practice-template.component.scss']
})

export class VerbPracticeTemplateComponent {
  /** DATA */
  verbsList$:Observable<VerbsList>;
  verbName$:Observable<string>;
  verbName:string;
  verbToConjugate$:Observable<Verbs | undefined>;
  verbObject:Verbs | undefined;
  conjugationSubject:Array<string>;
  conjugationVerbs:Array<string>;
  currentSubject:string;
  isCheckClicked:boolean = false;
  userScoreSummary:any = {};
  userAnswers:any = {};
  score:number = 0;
  index:number = 0;
  isBtnClicked:boolean = false;
  startTime:Moment;
  endTime:Moment;
  userId$:Observable<number>;
  userId:number;

  summaryMessage:string;
  spinnerValue:number = 0;
  color:string = 'black';
  mode: ProgressSpinnerMode = 'determinate';

  /** CONSTRUCTOR */
  constructor(private store: Store<{ verbsStore: VerbState, userStore: User }>, public dialog: MatDialog ) {
    // asigns whats in the state (a verb) to 'currentVerb'
    this.verbName$ = this.store.pipe(
      select('verbsStore'),
      map(state => currentVerb(state))
    )
    this.verbToConjugate$ = this.store.pipe(
      select('verbsStore'),
      map(state => selectVerb(state))
    )
    this.userId$ = this.store.pipe(
      select('userStore'),
      map(state => id(state))
    )
  };

  // VerbsList is the interface of all json object. keyof means it has to be the key that exists in VerbsList. Here we take name of the verb and use it to find the verb in json file.
  // findConjugationByVerb (verbName: keyof VerbsList) {
  //   this.verbsList$.subscribe((list) => {
  //     console.log(list);
  //     this.verbObject = list[verbName];
  //   })
  // }

  /** Sorts verbs */
  onCompare(_left: KeyValue<string, VerbsCong>, _right: KeyValue<string, VerbsCong>): number {
    return 1;
  }

  /**
   * Returns the subject to conjugate
   * @param index of person (je, tu, ...)
   */
  getConjugationSubject() {
    if(this.verbObject) {
      const subjects:Array<string> = Object.keys(this.verbObject.conjugation);
      this.conjugationSubject = subjects.map((subject) => {
        if (subject === 'ilelle') {
          return 'Il/elle';
        } else if (subject === 'ilselles') {
          return 'Ils/elles';
        } else {
          return subject.charAt(0).toUpperCase() + subject.slice(1);
        }
      })
    }
  }

  getConjugationVerbs() {
    if (this.verbObject) {
      const verbs = Object.values(this.verbObject.conjugation);
      const verbsLength = verbs.length;
      const listOfIndexes:Array<number> = [];

      while (listOfIndexes.length < 6) {
        const randomVerbIndex = Math.floor(Math.random() * verbsLength);
        if (!listOfIndexes.includes(randomVerbIndex)) {
          listOfIndexes.push(randomVerbIndex)
        }
      }
      this.conjugationVerbs = listOfIndexes.map((index) => verbs[index]);
    }
  }

  // Dialog with a hint
  // openDialog(conjugationPerson:string) {
  //   const helpPerson = conjugationPerson.toLowerCase();
  //   if(this.verbObject) {
  //     const helpConjugation = this.verbObject.conjugation[helpPerson];
  //     // Opens the dialog and sends data to be displayed
  //     this.dialog.open(VerbPracticeDialogComponent, {
  //       data: { person: helpPerson, conjugation: helpConjugation}
  //     })
  //   }
  // }

  addUserAnswer(subject:string, verb:string) {
    let subjectToLowerCase;

    switch(subject) {
      case 'Il/elle':
        subjectToLowerCase = 'ilelle';
        break;
      case 'Ils/elles':
        subjectToLowerCase = 'ilselles';
        break;
      default:
        subjectToLowerCase = subject.toLowerCase();
        break;
    }
    this.userAnswers[subject] = verb;

    if (this.verbObject && verb === this.verbObject.conjugation[subjectToLowerCase]) {
      this.score++;
    }

    this.isBtnClicked = true;
    setTimeout(() => {
      this.isBtnClicked = false;
      if (this.index < 5) {
        this.index++;
        this.spinnerValue = (this.index/6) * 100;
      } else {
        this.spinnerValue = 100;
        this.index = 6;
        this.checkAnswers();
      }
    }, 400);
  }

  // Function to check the fields and save answers in the server
  checkAnswers() {
    this.endTime = moment();

    const solvedIn = this.endTime.diff(this.startTime, 'seconds');

    this.dialog.open(VerbPracticeSummaryComponent, {
      data: {
        answers: this.userAnswers,
        userScoreSummary: {
          ...this.userScoreSummary,
          score: this.score,
          createdAt: this.startTime,
          solvedIn: solvedIn,
        },
        verbObject: this.verbObject,
      }
    });

    this.score = 0;
  }

  ngOnInit () {
    // currentVerb is an observable so we need to subscribe to it to use its value
    this.verbToConjugate$.subscribe((value) => {
      this.verbObject = value;
    })

    this.verbName$.subscribe((name) => {
      this.verbName = name;
    })

    this.userId$.subscribe((id) => {
      this.userId = id;
    })

    this.getConjugationSubject();
    this.getConjugationVerbs();

    this.userScoreSummary['userId'] = this.userId;

    this.startTime = moment();
    console.log(this.startTime);
  };
}
