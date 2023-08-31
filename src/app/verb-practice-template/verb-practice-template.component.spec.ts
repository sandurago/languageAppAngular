import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbPracticeTemplateComponent } from './verb-practice-template.component';

describe('VerbPracticeTemplateComponent', () => {
  let component: VerbPracticeTemplateComponent;
  let fixture: ComponentFixture<VerbPracticeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerbPracticeTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerbPracticeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
