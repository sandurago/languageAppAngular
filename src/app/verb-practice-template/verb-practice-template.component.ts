import { Component } from '@angular/core';
import { Verbs, VerbsList, VerbsCong } from '../interface/verbs';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { VerbState } from '../store/verbs/verbs.reducer';
import { currentVerb, findVerbToConjugate } from '../store/verbs/verbs.selectors';
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
  verbToConjugate$:Observable<Verbs>;
  verbObject:Verbs;
  verbName:string;
  conjugationPersons:Array<string>;
  isCheckClicked:boolean = false;
  dataWithAnswers:any = {};
  addPoints:number = 0;
  summaryMessage:string;
  url:string = "http://localhost:8080/verbs/insertDataToTable.php";

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
      const persons:Array<string> = Object.keys(verb.conjugation);
      this.conjugationPersons = persons.map(person => {
        return person.charAt(0).toUpperCase() + person.slice(1);
      });
    })
  }

  openDialog(conjugationPerson:string) {
    const helpPerson = conjugationPerson.toLowerCase();
    const helpConjugation = this.verbObject.conjugation[helpPerson];

    return this.dialog.open(VerbPracticeDialogComponent, {
      data: { person: helpPerson, conjugation: helpConjugation}
    })
  }

  // Function to check the fields and save answers in the server
  checkAnswers() {
    this.isCheckClicked = true;
    if (!this.FormGroup.valid) {
      return;
    }
    for (let i = 0; i < 6; i++) {
      const userInput = this.FormGroup.get('input' + (i+1))!.value;
      const person = this.conjugationPersons[i].toLowerCase();
      const answer = this.verbObject.conjugation[person] as unknown as string;

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
    //this.postAnswers(this.url, this.dataWithAnswers);
  }

  // Function to send data to the server (AJAX)
  async postAnswers(url:string, data:Object) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    })
    const json = await response.text();
    console.log(json);
    // then check the json status
  }
}
