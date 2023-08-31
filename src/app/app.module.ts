import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerbDisplayComponent } from './verb-display/verb-display.component';
import { HttpClientModule } from '@angular/common/http';
import { VerbPracticeTemplateComponent } from './verb-practice-template/verb-practice-template.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { verbsReducer } from './store/verbs/verbs.reducer';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { VerbPracticeDialogComponent } from './verb-practice-dialog/verb-practice-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { VerbPracticeSummaryComponent } from './verb-practice-summary/verb-practice-summary.component';

export function localStorageSyncReducer(rootReducer: any) {
  return localStorageSync({
    keys: [
      'verbsStore',
      'allVerbs',
      'verbName'
    ],
    rehydrate: true
  })(rootReducer)
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    VerbDisplayComponent,
    VerbPracticeTemplateComponent,
    VerbPracticeDialogComponent,
    VerbPracticeSummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    StoreModule.forRoot(
      { verbsStore: verbsReducer },
      {
        metaReducers: [localStorageSyncReducer]
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
