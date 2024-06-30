import { Component, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { User } from '../../Interface/user';
import { Observable, map } from 'rxjs';
import { id } from '../../Store/user/user.selector';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SummaryDialogData } from 'src/app/Interface/dialog';

@Component({
  selector: 'app-verb-practice-summary',
  templateUrl: './verb-practice-summary.component.html',
  styleUrls: ['./verb-practice-summary.component.scss']
})

export class VerbPracticeSummaryComponent {
  readonly data = inject<SummaryDialogData>(MAT_DIALOG_DATA);
  dataSource:Array<any>;
  columnsToDisplay:Array<string> = ['subject', 'answer', 'icon'];
  url:string = "http://localhost:5000/verbs/presentanswers";
  isProgressSaved:boolean = false;
  userId$:Observable<number>;
  userId:number;

  constructor(private store: Store<{ userStore: User }>,){
    this.userId$ = this.store.pipe(
      select('userStore'),
      map(state => id(state))
    )
  };

  // Function to send data to the server
  async postAnswers() {

    const dataToSend = {
      ...this.data,
      user: this.userId
    }
    const response = await fetch(this.url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(dataToSend)
    })
    const json = await response.json();
  }

  reloadPage() {
    window.location.reload();
  }

  ngOnInit() {
    this.dataSource = [];

    // Construct the object with values for the table
    for (const subject in this.data.answers) {
      const conjugationSubject = subject.toLowerCase().replace('/', '');
      this.dataSource.push({
        subject: subject,
        answer: this.data.answers[subject],
        correct: this.data.verbObject.conjugation[conjugationSubject],
      })
    }
  }
}
