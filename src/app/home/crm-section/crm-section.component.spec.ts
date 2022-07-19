import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmSectionComponent } from './crm-section.component';

describe('CrmSectionComponent', () => {
  let component: CrmSectionComponent;
  let fixture: ComponentFixture<CrmSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
