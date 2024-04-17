import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyBillDetailsComponent } from './party-bill-details.component';

describe('PartyBillDetailsComponent', () => {
  let component: PartyBillDetailsComponent;
  let fixture: ComponentFixture<PartyBillDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyBillDetailsComponent]
    });
    fixture = TestBed.createComponent(PartyBillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
