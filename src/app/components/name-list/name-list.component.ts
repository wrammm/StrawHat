import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.scss']
})
export class NameListComponent implements OnInit {

  constructor() { }

  value = 'Clear me';
  tilesPersonCounts: number[] = [];
  numberOfTeams = 1;
  numberPerTeam = 1;

  names: string[] = ['', '', '', ''];

  teamSplitOptions: any = {
    4: [
      {
        numPerTeam: 2,
        remainder: 0
      }
    ],
    5: [
      {
        numPerTeam: 2,
        remainder: 0
      }
    ]
  }
  ngOnInit(): void {
  }

  addInitName() {
    this.names.push('');
  }

  removeName(index: number) {
    this.names.splice(index, 1)
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  updateOptions() {
    let names: string[] = [];
    this.names.forEach(name => {
      if(name !== '') {
        names.push(name);
      }
    });
    if(names.length >= 2) {
      this.generateTeamsOptions(names, names.length); 
    }
  }

  generateTeamsOptions(names: string[], length: number) {
    console.log('names: ', names);
    console.log('length: ', length);
    this.tilesPersonCounts = [];
    this.numberOfTeams = length;
    for(let i = 0; i< length; i++) {
      this.tilesPersonCounts.push(1);
    }
  }

}
