import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbPracticeDialogComponent } from './verb-practice-dialog.component';

describe('VerbPracticeDialogComponent', () => {
  let component: VerbPracticeDialogComponent;
  let fixture: ComponentFixture<VerbPracticeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerbPracticeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerbPracticeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
