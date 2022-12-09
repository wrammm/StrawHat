import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-secret-santa-results',
  templateUrl: './secret-santa-results.component.html',
  styleUrls: ['./secret-santa-results.component.scss']
})
export class SecretSantaResultsComponent implements OnInit {

  message: any | string;

  constructor(
    public dialogRef: MatDialogRef<SecretSantaResultsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    console.log('in dialog: ' + this.data);
    if(this.data.mapping) {
      this.message = this.data.mapping.giver + ' you will be giving a gift to ' + this.data.mapping.reciever
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
