import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddicoComponent } from './addico.component';

describe('AddicoComponent', () => {
  let component: AddicoComponent;
  let fixture: ComponentFixture<AddicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
