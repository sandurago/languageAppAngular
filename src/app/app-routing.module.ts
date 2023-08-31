import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerbDisplayComponent } from './verb-display/verb-display.component';
import { VerbPracticeTemplateComponent } from './verb-practice-template/verb-practice-template.component';

const routes: Routes = [
  { path: 'display', component: VerbDisplayComponent },
  { path: 'practice/:verb', component: VerbPracticeTemplateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
