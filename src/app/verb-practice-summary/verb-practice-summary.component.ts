import { Component, Input } from '@angular/core';
import { Verbs, VerbsCong } from '../interface/verbs';

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

  dataKeys:Array<string>;
  dataValues:Array<string>;
  correctAnswers:Array<string>;

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

  ngOnInit() {
    this.getKeys();
    this.getValues();
    this.getCorrectAnswers();
  }
}
