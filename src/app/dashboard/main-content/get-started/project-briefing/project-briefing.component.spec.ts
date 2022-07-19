import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBriefingComponent } from './project-briefing.component';

describe('ProjectBriefingComponent', () => {
  let component: ProjectBriefingComponent;
  let fixture: ComponentFixture<ProjectBriefingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectBriefingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBriefingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
