import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundaNavbarComponent } from './funda-navbar.component';

describe('FundaNavbarComponent', () => {
  let component: FundaNavbarComponent;
  let fixture: ComponentFixture<FundaNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundaNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundaNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
