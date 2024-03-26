import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueResolveFormComponent } from './issue-resolve-form.component';

describe('IssueResolveFormComponent', () => {
  let component: IssueResolveFormComponent;
  let fixture: ComponentFixture<IssueResolveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueResolveFormComponent]
    });
    fixture = TestBed.createComponent(IssueResolveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
