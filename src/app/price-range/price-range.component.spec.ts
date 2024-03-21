import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRangeComponent } from './price-range.component';

describe('PriceRangeComponent', () => {
  let component: PriceRangeComponent;
  let fixture: ComponentFixture<PriceRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceRangeComponent]
    });
    fixture = TestBed.createComponent(PriceRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
