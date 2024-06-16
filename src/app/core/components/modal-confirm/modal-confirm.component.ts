import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalConfirmComponent {}
