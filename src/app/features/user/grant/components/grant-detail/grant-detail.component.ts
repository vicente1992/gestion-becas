import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Grant } from '@shared/models/grant';

@Component({
  selector: 'app-grant-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './grant-detail.component.html',
  styleUrl: './grant-detail.component.css',
})
export class GrantDetailComponent {
  grant = input.required<Grant | undefined>();
}
