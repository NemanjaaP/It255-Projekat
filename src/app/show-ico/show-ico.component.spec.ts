import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIcoComponent } from './show-ico.component';

describe('ShowIcoComponent', () => {
  let component: ShowIcoComponent;
  let fixture: ComponentFixture<ShowIcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowIcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
