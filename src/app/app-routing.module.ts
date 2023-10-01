import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerbDisplayComponent } from './verb-display/verb-display.component';
import { VerbPracticeTemplateComponent } from './verb-practice-template/verb-practice-template.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent},
  { path: 'display', component: VerbDisplayComponent },
  { path: 'practice/:verb', component: VerbPracticeTemplateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
