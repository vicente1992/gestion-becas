import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'aplicationStatus',
  standalone: true,
})
export class AplicationStatusPipe implements PipeTransform {

  status: { [key: string]: string } = {
    pending: 'Pendiente',
    underReview: 'En revisión',
    approved: 'Aprobado',
    rejected: 'Rechazado'
  }
  transform(value: string): string {
    return this.status[value] || 'pending';
  }

}
