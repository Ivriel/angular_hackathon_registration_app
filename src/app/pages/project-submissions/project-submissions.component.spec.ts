import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSubmissionsComponent } from './project-submissions.component';

describe('ProjectSubmissionsComponent', () => {
  let component: ProjectSubmissionsComponent;
  let fixture: ComponentFixture<ProjectSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSubmissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
