import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundaFooterComponent } from './funda-footer.component';

describe('FundaFooterComponent', () => {
  let component: FundaFooterComponent;
  let fixture: ComponentFixture<FundaFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundaFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
