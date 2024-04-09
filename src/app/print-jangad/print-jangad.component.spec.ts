import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintJangadComponent } from './print-jangad.component';

describe('PrintJangadComponent', () => {
  let component: PrintJangadComponent;
  let fixture: ComponentFixture<PrintJangadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintJangadComponent]
    });
    fixture = TestBed.createComponent(PrintJangadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
