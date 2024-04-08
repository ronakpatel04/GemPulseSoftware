import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondCalculationComponent } from './diamond-calculation.component';

describe('DiamondCalculationComponent', () => {
  let component: DiamondCalculationComponent;
  let fixture: ComponentFixture<DiamondCalculationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiamondCalculationComponent]
    });
    fixture = TestBed.createComponent(DiamondCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
