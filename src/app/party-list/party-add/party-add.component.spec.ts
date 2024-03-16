import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyAddComponent } from './party-add.component';

describe('PartyAddComponent', () => {
  let component: PartyAddComponent;
  let fixture: ComponentFixture<PartyAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyAddComponent]
    });
    fixture = TestBed.createComponent(PartyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
