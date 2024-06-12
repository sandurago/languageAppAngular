import { Component } from '@angular/core';
import { Verbs, VerbsList, VerbsCong } from '../../Interface/verbs';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { VerbState } from '../../store/verbs/verbs.reducer';
import { currentVerb, findVerbToConjugate } from '../../store/verbs/verbs.selectors';
import { KeyValue } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { VerbPracticeDialogComponent } from '../verb-practice-dialog/verb-practice-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-verb-practice-template',
  templateUrl: './verb-practice-template.component.html',
  styleUrls: ['./verb-practice-template.component.scss']
})

export class VerbPracticeTemplateComponent {
  /** DATA */
  verbsList$:Observable<VerbsList>;
  currentVerbName$:Observable<string>;
  verbToConjugate$:Observable<Verbs | undefined>;
  verbObject:Verbs | undefined;
  verbName:string;
  conjugationPersons:Array<string>;
  isCheckClicked:boolean = false;
  dataWithAnswers:any = {};
  addPoints:number = 0;
  summaryMessage:string;

  /** CONSTRUCTOR */
  constructor(private store: Store<{ verbsStore: VerbState }>, private _formBuilder: FormBuilder, public dialog: MatDialog ) {
    // asigns whats in the state (a verb) to 'currentVerb'
    this.currentVerbName$ = this.store.pipe(
      select('verbsStore'),
      map(state => currentVerb(state))
    )
    this.verbToConjugate$ = this.store.pipe(
      select('verbsStore'),
      map(state => findVerbToConjugate(state))
    )
  };

  FormGroup = this._formBuilder.group({
    input1: ['', Validators.required],
    input2: ['', Validators.required],
    input3: ['', Validators.required],
    input4: ['', Validators.required],
    input5: ['', Validators.required],
    input6: ['', Validators.required]
  })

  /** METHODS */
  ngOnInit () {
    // currentVerb is an observable so we need to subscribe to it to use its value
    this.verbToConjugate$.subscribe((value) => {
      this.verbObject = value;
    })

    this.currentVerbName$.subscribe((name) => {
      this.verbName = name;
    })

    //At the start of the page it gets all the persons of practiced verb
    this.getConjugationPersons();
  };

  // VerbsList is the interface of all json object. keyof means it has to be the key that exists in VerbsList. Here we take name of the verb and use it to find the verb in json file.
  findConjugationByVerb (verbName: keyof VerbsList) {
    this.verbsList$.subscribe((list) => {
      console.log(list, verbName)
      this.verbObject = list[verbName];
    })
  }
  /** Sorts verbs */
  onCompare(_left: KeyValue<string, VerbsCong>, _right: KeyValue<string, VerbsCong>): number {
    return 1;
  }

  /**
   * Returns the subject to conjugate
   * @param index of person (je, tu, ...)
   */
  getConjugationPersons() {
    this.verbToConjugate$.subscribe((verb) => {
      if (verb) {
        const persons:Array<string> = Object.keys(verb.conjugation);
        this.conjugationPersons = persons.map(person => {
          return person.charAt(0).toUpperCase() + person.slice(1);
        });
      }
    })
  }

  // Dialog with a hint
  openDialog(conjugationPerson:string) {
    const helpPerson = conjugationPerson.toLowerCase();
    if(this.verbObject) {
      const helpConjugation = this.verbObject.conjugation[helpPerson];
      // Opens the dialog and sends data to be displayed
      this.dialog.open(VerbPracticeDialogComponent, {
        data: { person: helpPerson, conjugation: helpConjugation}
      })
    }
  }

  // Function to check the fields and save answers in the server
  checkAnswers() {
    if (!this.FormGroup.valid) {
      return;
    }
    this.isCheckClicked = true;

    // Save the name of the verb in data with Answers to send to PHP
    this.currentVerbName$.subscribe(verb => {
      this.dataWithAnswers = {
        verb: verb
      }
    })

    for (let i = 0; i < 6; i++) {
      const userInput = this.FormGroup.get('input' + (i+1))!.value;
      const person = this.conjugationPersons[i].toLowerCase();
      const answer = this.verbObject!.conjugation[person] as unknown as string;

      this.dataWithAnswers[person] = userInput;
      if (userInput === answer) {
        this.addPoints++;
      }
    }
    if(this.addPoints == 6) {
      this.summaryMessage = "Perfect!";
    } else if (this.addPoints > 3 && this.addPoints < 6) {
      this.summaryMessage = "Not bad… not bad!";
    } else if (this.addPoints <= 3) {
      this.summaryMessage = "It doesn't hurt to try again :)";
    }
    this.addPoints = 0;

    setTimeout(() => {
      const summary = document.getElementById('summary');
      if (summary) {
        summary.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  }
}
