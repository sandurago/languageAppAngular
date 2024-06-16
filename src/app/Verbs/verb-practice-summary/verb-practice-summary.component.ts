import { Component, Input } from '@angular/core';
import { Verbs } from '../../Interface/verbs';
import { Store, select } from '@ngrx/store';
import { User } from '../../Interface/user';
import { Observable, map } from 'rxjs';
import { id } from '../../Store/user/user.selector';

@Component({
  selector: 'app-verb-practice-summary',
  templateUrl: './verb-practice-summary.component.html',
  styleUrls: ['./verb-practice-summary.component.scss']
})
export class VerbPracticeSummaryComponent {
  // DATA
  @Input() currentVerb:string = '';
  @Input() data:any = {};
  @Input() verbsObj:Verbs;
  @Input() message:string;

  dataSource:Array<any>;
  columnsToDisplay:Array<string> = ['subject', 'answer'];
  dataKeys:Array<string>;
  dataValues:Array<string>;
  correctAnswers:Array<string>;
  url:string = "http://localhost:8000/user/answers";
  isProgressSaved:boolean = false;
  buttonLabel:string = "Save my progress";
  userId$:Observable<number>;
  userId:number;

  constructor(private store: Store<{ userStore: User }>){
    this.userId$ = this.store.pipe(
      select('userStore'),
      map(state => id(state))
    )
  };

  // METHODS
  getKeys() {
    this.dataKeys = Object.keys(this.data);
  }
  getValues() {
    this.dataValues = Object.values(this.data);
  }
  // Gets correct values for the verb
  getCorrectAnswers() {
    this.correctAnswers = Object.values(this.verbsObj.conjugation);
  }

  // Function to send data to the server (AJAX)
  async postAnswers() {

    const dataToSend = {
      ...this.data,
      user: this.userId
    }
    const response = await fetch(this.url, { // THIS is the Request that I get on the PHP side.
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
    // then check the json status
    // if saving to db is successful:
    this.buttonLabel = json.message;
  }

  reloadPage() {
    window.location.reload();
  }


  ngOnInit() {
    this.getKeys();
    this.getValues();
    this.getCorrectAnswers();

    //Remove 'verb' key from keys answers for the purpose of displaying only answers.
    this.dataKeys.shift();

    this.dataSource = this.dataKeys.map((key) => ({
      subject: key,
      answer: this.data[key],
      correct: this.verbsObj.conjugation[key]
    }))

    this.userId$.subscribe((user) => {
      this.userId = user;
    })
  }
}
