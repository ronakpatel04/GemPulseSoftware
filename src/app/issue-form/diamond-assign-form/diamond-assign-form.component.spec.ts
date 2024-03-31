import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondAssignFormComponent } from './diamond-assign-form.component';

describe('DiamondAssignFormComponent', () => {
  let component: DiamondAssignFormComponent;
  let fixture: ComponentFixture<DiamondAssignFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiamondAssignFormComponent]
    });
    fixture = TestBed.createComponent(DiamondAssignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
