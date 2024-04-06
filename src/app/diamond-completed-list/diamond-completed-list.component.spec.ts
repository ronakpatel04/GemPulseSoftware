import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondCompletedListComponent } from './diamond-completed-list.component';

describe('DiamondCompletedListComponent', () => {
  let component: DiamondCompletedListComponent;
  let fixture: ComponentFixture<DiamondCompletedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiamondCompletedListComponent]
    });
    fixture = TestBed.createComponent(DiamondCompletedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
