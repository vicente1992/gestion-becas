import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { GrantListComponent } from '../../components/grant-list/grant-list.component';
import { FilterComponent } from '@shared/components/filter/filter.component';
import { ModalService } from '@core/services/modal.service';
import { GrantFormComponent } from '../../components/grant-form/grant-form.component';
import { GrantService } from '@shared/services/grant.service';
import { Grant } from '@shared/models/grant';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { Params } from '@angular/router';
import { Filter } from '@shared/models/filter';

@Component({
  selector: 'app-grant',
  standalone: true,
  imports: [
    CommonModule,
    GrantListComponent,
    FilterComponent,
    GrantFormComponent,
    PaginationComponent
  ],
  templateUrl: './grant.component.html',
  styleUrl: './grant.component.css',
  providers: [GrantService]
})
export default class GrantComponent implements OnInit {
  #modalService = inject(ModalService);
  #grantService = inject(GrantService);
  grants = signal<Grant[]>([]);
  page = signal<number>(1);
  limit = signal<number>(7);
  total = signal<number>(0);
  totalPages = computed(() => Math.ceil(this.total() / this.limit()));
  filter = signal<Filter>({ title: '', levelEducation: '', status: '' });

  ngOnInit(): void {
    this.#getGrants();
  }

  #getGrants() {
    const params: Params = {
      page: this.page(),
      limit: this.limit(),
      ...this.filter()
    }
    this.#grantService.getAll(params)
      .pipe(tap(({ data, count }) => {
        this.grants.set(data);
        this.total.set(count);
      })).subscribe();
  }


  openModal() {
    this.#modalService.openDialog(GrantFormComponent)
      .subscribe(() => this.#getGrants())
  }

  onLoad() {
    this.#getGrants()
  }

  onPagination(currentPage: number) {
    this.page.set(currentPage);
    this.#getGrants();
  }

  onFilter(filter: Filter) {
    this.filter.set(filter);
    this.page.set(1);
    this.#getGrants();
  }
}
