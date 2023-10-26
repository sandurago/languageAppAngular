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
import { MatTableModule } from '@angular/material/table';
import { LoginPageComponent } from './login/login-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MainPageComponent } from './main-page/main-page.component';
import { userReducer } from './store/user/user.reducer';
import { IndexComponent } from './index/index.component';

export function localStorageSyncReducer(rootReducer: any) {
  return localStorageSync({
    keys: [
      'verbsStore',
      'allVerbs',
      'verbName',
      'userStore',
      'nickname',
      'name',
      'password',
      'login'
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
    LoginPageComponent,
    MainPageComponent,
    IndexComponent,
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
    MatTableModule,
    MatIconModule,
    StoreModule.forRoot(
      {
        verbsStore: verbsReducer,
        userStore: userReducer
      },
      {
        metaReducers: [localStorageSyncReducer]
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
