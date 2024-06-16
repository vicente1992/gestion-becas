import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Application } from '@shared/models/application';
import { AplicationStatusPipe } from '@shared/pipes/AplicationStatus.pipe';

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [
    CommonModule,
    AplicationStatusPipe
  ],
  templateUrl: './applications-list.component.html',
  styleUrl: './applications-list.component.css',
})
export class ApplicationsListComponent {
  applications = input.required<Application[]>();
}
