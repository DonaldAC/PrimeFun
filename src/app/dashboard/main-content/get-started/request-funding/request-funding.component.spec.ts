import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFundingComponent } from './request-funding.component';

describe('RequestFundingComponent', () => {
  let component: RequestFundingComponent;
  let fixture: ComponentFixture<RequestFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestFundingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
