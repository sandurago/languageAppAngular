import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerbDisplayComponent } from './verb-display/verb-display.component';
import { VerbPracticeTemplateComponent } from './verb-practice-template/verb-practice-template.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  //same component different routes
  { path: 'register', component: MainPageComponent },
  { path: 'login', component: MainPageComponent },
  { path: 'display', component: VerbDisplayComponent },
  { path: 'practice/:verb', component: VerbPracticeTemplateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
