import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html'
})
export class PopupComponent {

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
