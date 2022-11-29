import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeamResultsDialogComponent } from '../team-results-dialog/team-results-dialog.component';

@Component({
  selector: 'app-name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.scss']
})
export class NameListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  tilesPersonCounts: number[] = [];
  numberOfTeams = 1;
  numberOfPeople = 0;

  names: string[] = ['', '', '', ''];
  namesWithInput: string[] = [];
  graph: any;
  x: any;
  y: any;

  ngOnInit(): void {
  }

  addInitName() {
    this.names.push('');
  }

  removeName(index: number) {
    this.names.splice(index, 1);
    this.updateOptions();
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  updateOptions() {
    this.namesWithInput = [];
    this.names.forEach(name => {
      if (name !== '') {
        this.namesWithInput.push(name);
      }
    });
    if (this.namesWithInput.length >= 2) {
      this.generateTeamsOptions(this.namesWithInput, this.namesWithInput.length);
    }
  }

  changeNumberOfTeams(increment: boolean, event ?: any) {
    console.log('event1: ', event);
    let numberOfTeamsOriginal = this.numberOfTeams;
    if (this.numberOfPeople === 0 && event === undefined) {
      return;
    } 
    if (event === null) {
      return;
    }
    console.log('event: ', event);
    if(event === undefined){ 
      if (increment) {
        this.numberOfTeams = (this.numberOfTeams < this.numberOfPeople) ? this.numberOfTeams + 1 : this.numberOfPeople;
      } else {
        this.numberOfTeams = (this.numberOfTeams > 1) ? this.numberOfTeams - 1 : 1;
      }
    } else {
      console.log('else this.numberOfTeams: ', event);
      if(this.numberOfTeams < 1) {
        this.numberOfTeams = 1;
      } else if(this.numberOfTeams > this.numberOfPeople) {
        this.numberOfTeams = this.numberOfPeople;
      }
      this.updateNumberOfTeams();
    }

    if (numberOfTeamsOriginal !== this.numberOfTeams) {
      this.updateNumberOfTeams();
    }
  }

  updateNumberOfTeams() {
    this.tilesPersonCounts = [];
    // console.log('updateNumberOfTeams: ', this.numberOfTeams); //2
    // console.log('this.numberOfPeople: ', this.numberOfPeople); //4

    let numberOfPeople = this.numberOfPeople;
    let numberOfTeams = this.numberOfTeams;

    let divide = Math.floor(numberOfPeople / numberOfTeams);
    let remainder = numberOfPeople % numberOfTeams;
    // console.log('divide: ', divide);
    // console.log('remainder: ', remainder);
    for (let i = 0; i < numberOfTeams; i++) {
      this.tilesPersonCounts.push(1);
    }
    // this.tilesPersonCounts.forEach(tilesPersonCount => {
    //   tilesPersonCount = divide;
    // });
    for (let i = 0; i < this.tilesPersonCounts.length; i++) {
      this.tilesPersonCounts[i] = divide;
    }

    for (let i = 0; i < remainder; i++) {
      this.tilesPersonCounts[i]++;
    }
    // console.log('this.tilesPersonCounts: ', this.tilesPersonCounts);
  }

  generateTeamsOptions(names: string[], length: number) {
    // console.log('names: ', names);
    // console.log('length: ', length);
    this.tilesPersonCounts = [];
    this.numberOfPeople = length;
    for (let i = 0; i < length; i++) {
      this.tilesPersonCounts.push(1);
    }
  }

  generateTeams() {
    let generatedTeams: any = [];
    let generatedTeam: any = [];
    // console.log('this.names: ', this.names);
    let shuffledNames = this.shuffleNames(this.namesWithInput.slice());
    // console.log('shuffle: ', shuffledNames);
    let index = 0;
    this.tilesPersonCounts.forEach(tilesPersonCount => {
      for (let i = 0; i < tilesPersonCount; i++) {
        generatedTeam.push(shuffledNames[index]);
        index++;
      }
      generatedTeams.push(generatedTeam);
      generatedTeam = [];
    });
    // console.log('generatedTeams: ', generatedTeams);
    this.openResultsDialog(generatedTeams);
  }

  openResultsDialog(generatedTeams: any) {
    const dialogRef = this.dialog.open(TeamResultsDialogComponent, {
      data: {
        generatedTeams: generatedTeams,
      },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  shuffleNames(array: string[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  generateChart() {
    let x: any = [];
    let y: any = [];
    let index = 1;
    let shuffledNames = this.shuffleNames(this.namesWithInput.slice());
    let chartWidth = 150;
    shuffledNames.forEach(name => {
      x.push(name);
      y.push(index);
      chartWidth += 50;
      index++;
    });

    this.x = x;
    this.y = y;

    this.setGraph(chartWidth);
  }

  setGraph(chartWidth: number) {
    this.graph = {
      data: [
        {
          x: this.x,
          y: this.y,
          text: this.x,
          hoverinfo: 'skip',
          textposition: 'inside',
          type: 'bar',
          labels: {x: 'Year', y:'Dollars USD'}
        },
      ],
      layout: {
        xaxis: { visible: true, showticklabels: false, fixedrange: true,  
          title: {
            text: 'Selected straws'
          }
        },
        yaxis: { visible: true, showticklabels: false, fixedrange: true,  
          title: {
            text: 'Straw length'
          }
        },
        autosize: false,
        width: chartWidth,
      },
      config: {
        displayModeBar: false, // this is the line that hides the bar.
      }
    };
  }

}
