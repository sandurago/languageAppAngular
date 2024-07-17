import { Component, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { User } from '../../Interface/user';
import { Observable, map } from 'rxjs';
import { id } from '../../Store/user/user.selector';
import { id as verbId } from '../../Store/verbs/verbs.selectors';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SummaryDialogData } from 'src/app/Interface/dialog';
import { VerbState } from 'src/app/Store/verbs/verbs.reducer';
import { NotificationService } from 'src/app/Services/notification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verb-practice-summary',
  templateUrl: './verb-practice-summary.component.html',
  styleUrls: ['./verb-practice-summary.component.scss'],
  providers: [],
})

export class VerbPracticeSummaryComponent {
  readonly data = inject<SummaryDialogData>(MAT_DIALOG_DATA);
  dataSource:Array<any>;
  columnsToDisplay:Array<string> = ['subject', 'answer', 'icon'];
  url:string = "http://localhost:5000/verbs/presentanswers";
  isProgressSaved:boolean = false;
  userId$:Observable<number>;
  userId:number;
  verbId$:Observable<number | undefined>;
  verbId:number | undefined;

  constructor(
    private store: Store<{ userStore: User, verbsStore: VerbState, notificationStore: Notification }>,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    this.userId$ = this.store.pipe(
      select('userStore'),
      map(state => id(state))
    )
    this.verbId$ = this.store.pipe(
      select('verbsStore'),
      map(state => verbId(state))
    )
  };

  // Function to send data to the server
  async postAnswers() {

    const dataToSend = {
      verbId: this.verbId,
      userId: this.data.userScoreSummary.userId,
      score: this.data.userScoreSummary.score,
      createdAt: this.data.userScoreSummary.createdAt,
      solvedIn: this.data.userScoreSummary.solvedIn,
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
      body: JSON.stringify(dataToSend),
    })
    const json = await response.text();

    this.notificationService.showNotification('success', 'Progress sucessfully saved!');
    this.router.navigateByUrl('/display');
  }

  reloadPage() {
    window.location.reload();
  }

  ngOnInit() {
    this.verbId$.subscribe((id) => {
      this.verbId = id;
    })

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
