import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeIcoGuideComponent } from './fake-ico-guide.component';

describe('FakeIcoGuideComponent', () => {
  let component: FakeIcoGuideComponent;
  let fixture: ComponentFixture<FakeIcoGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakeIcoGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeIcoGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
