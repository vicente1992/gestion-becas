import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, Signal, inject, output } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LevelEducation } from '@features/admin/grant/shared/models/leve-education';
import { LevelEducationService } from '@features/admin/grant/shared/services/level-education.service';
import { Filter } from '@shared/models/filter';
import { Observable, debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
  providers: [LevelEducationService]
})
export class FilterComponent implements OnInit {

  #levelEducationService = inject(LevelEducationService);
  #destroy: DestroyRef = inject(DestroyRef);
  filter = output<Filter>();

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    levelEducation: new FormControl(''),
    status: new FormControl(''),
  });

  #levelsEducations$: Observable<LevelEducation[]> = this.#levelEducationService.getAll();

  levelsEducations: Signal<LevelEducation[]> = toSignal(this.#levelsEducations$, { initialValue: [] });

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.#destroy), debounceTime(300),
        tap(() => this.filter.emit(this.form.value))
      ).subscribe();
  }

  resetForm() {
    this.form.patchValue({ title: '', levelEducation: '', status: '' });
    this.filter.emit(this.form.value);
  }
}
