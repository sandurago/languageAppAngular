import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbDisplayComponent } from './verb-display.component';

describe('VerbDisplayComponent', () => {
  let component: VerbDisplayComponent;
  let fixture: ComponentFixture<VerbDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerbDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerbDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
