import { Component, Input } from '@angular/core';
import { Verbs } from '../interface/verbs';

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
  url:string = "http://localhost:8080/verbs/insertDataToTable.php";
  isProgressSaved:boolean = false;
  buttonLabel:string = "Save my progress";

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
    const response = await fetch(this.url, { // THIS is the Request that I get on the PHP side.
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(this.data)
    })
    const json = await response.text();
    // then check the json status
    // if saving to db is successful:
    if (json === '200') {
      this.isProgressSaved = true;
      this.buttonLabel = "Progress saved!";
    } else {
      this.buttonLabel = "Error. Try again";
    }
  }

  reloadPage() {
    window.location.reload();
  }


  ngOnInit() {
    this.getKeys();
    this.getValues();
    this.getCorrectAnswers();

    this.dataSource = this.dataKeys.map((key) => ({
      subject: key,
      answer: this.data[key],
      correct: this.verbsObj.conjugation[key]
    }))
  }
}
