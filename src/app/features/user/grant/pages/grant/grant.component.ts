import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Params } from '@angular/router';
import { tap } from 'rxjs';
import { FilterComponent } from '@shared/components/filter/filter.component';
import { Filter } from '@shared/models/filter';
import { Grant } from '@shared/models/grant';
import { GrantService } from '@shared/services/grant.service';
import { CardGrantComponent } from '../../components/card-grant/card-grant.component';

@Component({
  selector: 'app-grant',
  standalone: true,
  imports: [
    CommonModule,
    CardGrantComponent,
    FilterComponent
  ],
  templateUrl: './grant.component.html',
  styleUrl: './grant.component.css',
  providers: [GrantService]
})
export default class GrantComponent implements OnInit {

  #grantService = inject(GrantService);
  grants = signal<Grant[]>([]);
  filter = signal<Filter>({ title: '', levelEducation: '', status: '' });

  ngOnInit(): void {
    this.#getGrants();
  }

  #getGrants() {
    const params: Params = {
      ...this.filter()
    }
    this.#grantService.getAll(params)
      .pipe(tap(({ data }) => this.grants.set(data))).subscribe();
  }


  onFilter(filter: Filter) {
    this.filter.set(filter);
    this.#getGrants();
  }


}
