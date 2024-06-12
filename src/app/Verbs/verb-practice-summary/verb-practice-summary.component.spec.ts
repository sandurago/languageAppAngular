import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbPracticeSummaryComponent } from './verb-practice-summary.component';

describe('VerbPracticeSummaryComponent', () => {
  let component: VerbPracticeSummaryComponent;
  let fixture: ComponentFixture<VerbPracticeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerbPracticeSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerbPracticeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
