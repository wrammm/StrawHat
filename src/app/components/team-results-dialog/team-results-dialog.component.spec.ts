import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamResultsDialogComponent } from './team-results-dialog.component';

describe('TeamResultsDialogComponent', () => {
  let component: TeamResultsDialogComponent;
  let fixture: ComponentFixture<TeamResultsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamResultsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
