import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerbDisplayComponent } from './Verbs/verb-display/verb-display.component';
import { VerbPracticeTemplateComponent } from './Verbs/verb-practice-template/verb-practice-template.component';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: IndexComponent },
  { path: 'register', component: IndexComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'display', component: VerbDisplayComponent },
  { path: 'practice/:verb', component: VerbPracticeTemplateComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
