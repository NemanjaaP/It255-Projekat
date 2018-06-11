import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyScamTokenComponent } from './buy-scam-token.component';

describe('BuyScamTokenComponent', () => {
  let component: BuyScamTokenComponent;
  let fixture: ComponentFixture<BuyScamTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyScamTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyScamTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
