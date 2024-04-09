import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JangadListComponent } from './jangad-list.component';

describe('JangadListComponent', () => {
  let component: JangadListComponent;
  let fixture: ComponentFixture<JangadListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JangadListComponent]
    });
    fixture = TestBed.createComponent(JangadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
