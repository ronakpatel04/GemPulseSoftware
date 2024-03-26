import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueResolveListComponent } from './issue-resolve-list.component';

describe('IssueResolveListComponent', () => {
  let component: IssueResolveListComponent;
  let fixture: ComponentFixture<IssueResolveListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueResolveListComponent]
    });
    fixture = TestBed.createComponent(IssueResolveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
