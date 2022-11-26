import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-team-results-dialog',
  templateUrl: './team-results-dialog.component.html',
  styleUrls: ['./team-results-dialog.component.scss']
})
export class TeamResultsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  teams: any;

  ngOnInit(): void {
    console.log('data in team results: ', this.data);
    this.teams = this.data.generatedTeams;
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
