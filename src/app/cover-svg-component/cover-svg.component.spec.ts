import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverSvgComponentComponent } from './cover-svg.component';

describe('CoverSvgComponentComponent', () => {
  let component: CoverSvgComponentComponent;
  let fixture: ComponentFixture<CoverSvgComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverSvgComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverSvgComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
