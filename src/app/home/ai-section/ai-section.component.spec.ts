import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiSectionComponent } from './ai-section.component';

describe('AiSectionComponent', () => {
  let component: AiSectionComponent;
  let fixture: ComponentFixture<AiSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
