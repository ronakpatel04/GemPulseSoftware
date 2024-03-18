import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketAddComponent } from './packet-add.component';

describe('PacketAddComponent', () => {
  let component: PacketAddComponent;
  let fixture: ComponentFixture<PacketAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacketAddComponent]
    });
    fixture = TestBed.createComponent(PacketAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
