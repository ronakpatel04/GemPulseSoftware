import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyViewComponent } from './party-view.component';

describe('PartyViewComponent', () => {
  let component: PartyViewComponent;
  let fixture: ComponentFixture<PartyViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyViewComponent]
    });
    fixture = TestBed.createComponent(PartyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
