import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { ModalService } from '@core/services/modal.service';
import { Grant } from '@shared/models/grant';
import { GrantFormComponent } from '../grant-form/grant-form.component';
import { GrantService } from '@shared/services/grant.service';

@Component({
  selector: 'app-grant-list',
  standalone: true,
  imports: [
    CommonModule,
    GrantFormComponent
  ],
  templateUrl: './grant-list.component.html',
  styleUrl: './grant-list.component.css',
  providers: [GrantService]
})
export class GrantListComponent {
  grants = input.required<Grant[]>();
  #modalService = inject(ModalService);
  #grantService = inject(GrantService);
  onLoad = output<void>();

  async deleteGrant(id: string) {
    const response = await this.#modalService.confirm();
    if (response) {
      this.delete(id);
    }
  }

  delete(id: string) {
    this.#grantService.delete(id)
      .subscribe(() => this.onLoad.emit());
  }

  openModal(data: Grant) {
    this.#modalService.openDialog<Grant>(GrantFormComponent, { ...data })
      .subscribe(() => this.onLoad.emit());
  }
}
