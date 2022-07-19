import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundersSectionComponent } from './founders-section.component';

describe('FoundersSectionComponent', () => {
  let component: FoundersSectionComponent;
  let fixture: ComponentFixture<FoundersSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundersSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
