import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyBillsComponent } from './party-bills.component';

describe('PartyBillsComponent', () => {
  let component: PartyBillsComponent;
  let fixture: ComponentFixture<PartyBillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyBillsComponent]
    });
    fixture = TestBed.createComponent(PartyBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
