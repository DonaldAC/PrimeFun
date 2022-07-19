import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeCanFundSectionComponent } from './we-can-fund-section.component';

describe('WeCanFundSectionComponent', () => {
  let component: WeCanFundSectionComponent;
  let fixture: ComponentFixture<WeCanFundSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeCanFundSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeCanFundSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
