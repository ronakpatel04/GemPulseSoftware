import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryListComponent } from './employee-salary-list.component';

describe('EmployeeSalaryListComponent', () => {
  let component: EmployeeSalaryListComponent;
  let fixture: ComponentFixture<EmployeeSalaryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeSalaryListComponent]
    });
    fixture = TestBed.createComponent(EmployeeSalaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
