import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondCompletedFormComponent } from './diamond-completed-form.component';

describe('DiamondCompletedFormComponent', () => {
  let component: DiamondCompletedFormComponent;
  let fixture: ComponentFixture<DiamondCompletedFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiamondCompletedFormComponent]
    });
    fixture = TestBed.createComponent(DiamondCompletedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
