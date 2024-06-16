import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {

  #snackBar = inject(MatSnackBar);

  openSnackBar(Message: string) {
    this.#snackBar.open(Message, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
