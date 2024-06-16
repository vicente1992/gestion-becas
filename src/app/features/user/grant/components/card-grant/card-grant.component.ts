import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalService } from '@core/services/modal.service';
import { AplicationFormComponent } from '@features/user/grant/components/aplication-form/aplication-form.component';
import { Grant } from '@shared/models/grant'; 

@Component({
  selector: 'app-card-grant',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './card-grant.component.html',
  styleUrl: './card-grant.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardGrantComponent {
  grant = input.required<Grant>();
  #modalService = inject(ModalService);


  openModal(data: Grant) {
    this.#modalService.openDialog<Grant>(AplicationFormComponent, { ...data })
      .subscribe(() => console.log);
  }

}
