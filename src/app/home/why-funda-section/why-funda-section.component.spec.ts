import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyFundaSectionComponent } from './why-funda-section.component';

describe('WhyFundaSectionComponent', () => {
  let component: WhyFundaSectionComponent;
  let fixture: ComponentFixture<WhyFundaSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyFundaSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyFundaSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
