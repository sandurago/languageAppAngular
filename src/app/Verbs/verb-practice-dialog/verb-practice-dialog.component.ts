import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogData } from '../../Interface/dialog';


@Component({
  selector: 'app-verb-practice-dialog',
  templateUrl: './verb-practice-dialog.component.html',
  styleUrls: ['./verb-practice-dialog.component.scss'],
})

export class VerbPracticeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VerbPracticeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){}

  closeDialog() {
    this.dialogRef.close();
  }
}
