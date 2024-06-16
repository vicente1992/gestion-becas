import { CommonModule } from '@angular/common';
import { Component, Signal, computed, inject, input, } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, switchMap } from 'rxjs';
import { Grant } from '@shared/models/grant';
import { GrantService } from '@shared/services/grant.service';
import { GrantDetailComponent } from '../../components/grant-detail/grant-detail.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    GrantDetailComponent,
    RouterLink
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  providers: [GrantService]
})
export default class DetailComponent {
  #grantService = inject(GrantService);

  grantExist: Signal<boolean> = computed(() => !!this.grant());

  id: Signal<string> = input.required<string>();

  #grantId$: Observable<string> = toObservable(this.id);

  #grant$: Observable<Grant | undefined> = this.#grantId$.pipe(switchMap(() => this.#grantService.getOne(this.id())));

  grant: Signal<Grant | undefined> = toSignal(this.#grant$, { initialValue: undefined });


}
