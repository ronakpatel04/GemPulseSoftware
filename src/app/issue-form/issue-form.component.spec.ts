import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueFormComponent } from './issue-form.component';

describe('IssueFormComponent', () => {
  let component: IssueFormComponent;
  let fixture: ComponentFixture<IssueFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueFormComponent]
    });
    fixture = TestBed.createComponent(IssueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
