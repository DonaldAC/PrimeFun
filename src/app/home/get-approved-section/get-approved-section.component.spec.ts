import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetApprovedSectionComponent } from './get-approved-section.component';

describe('GetApprovedSectionComponent', () => {
  let component: GetApprovedSectionComponent;
  let fixture: ComponentFixture<GetApprovedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetApprovedSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetApprovedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
