import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Application } from '@shared/models/application';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApplicationService } from '@shared/services/application.service';
import { AplicationStatusPipe } from '@shared/pipes/AplicationStatus.pipe';

type Status = 'approved' | 'rejected'

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    AplicationStatusPipe
  ],
  templateUrl: './applications-list.component.html',
  styleUrl: './applications-list.component.css',
  providers: [ApplicationService]
})
export class ApplicationsListComponent {
  #applicationService = inject(ApplicationService);
  applications = input.required<Application[]>();
  onLoad = output<void>();

  downloadDocument(documentUrl: string) {

    fetch(documentUrl, { method: 'GET', }).then(response => response.blob())
      .then(pdf => {
        window.open(URL.createObjectURL(pdf), '_blank');
      })
      .catch(err => {
        console.log(err);
      });

  }

  update(data: Application, status: Status) {
    data.status = status;
    this.#applicationService.update(data._id, data)
      .subscribe(() => this.onLoad.emit());
  }
}
