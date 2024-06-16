import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { UploadFileComponent } from '@shared/components/upload-file/upload-file.component';
import { LevelEducationService } from '../../shared/services/level-education.service';
import { LevelEducation } from '../../shared/models/leve-education';
import { Grant } from '@shared/models/grant';
import { GrantService } from '@shared/services/grant.service';
@Component({
  selector: 'app-grant-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    UploadFileComponent
  ],
  templateUrl: './grant-form.component.html',
  styleUrl: './grant-form.component.css',
  providers: [LevelEducationService, GrantService]
})
export class GrantFormComponent implements OnInit {
  @Inject(DIALOG_DATA) public data: Grant = inject(DIALOG_DATA);
  public dialogRef = inject(MatDialogRef);
  #levelEducationService = inject(LevelEducationService);
  #grantService = inject(GrantService);
  logoUrl = signal<string>('');
  grantId = signal<string | undefined>('');
  fileExtensions = signal<string[]>(['png', 'jpg', 'jpeg']);
  grantExists = computed(() => !!this.grantId());

  #levelsEducations$: Observable<LevelEducation[]> = this.#levelEducationService.getAll();

  levelsEducations: Signal<LevelEducation[]> = toSignal(this.#levelsEducations$, { initialValue: [] });

  form: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    levelEducation: new FormControl(null, [Validators.required]),
    dateEnd: new FormControl(null, [Validators.required]),
    initialDate: new FormControl(null, [Validators.required]),
    logo: new FormControl(null, [Validators.required]),
    requirements: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    if (this.data) {
      const { levelEducationId: levelEducation, ...res } = this.data;
      this.form.patchValue({ ...res, levelEducation });
      this.logoUrl.set(res.logo);
      this.grantId.set(res._id);
    }
  }

  onSubmit() {
    this.grantExists() ? this.update() : this.create();
  }

  create(): void {
    this.#grantService.create(this.form.value)
      .subscribe(() => this.dialogRef.close(true))
  }

  update(): void {
    this.#grantService.update(this.grantId() as string, this.form.value)
      .subscribe(() => this.dialogRef.close(true))
  }

  onFile(logo: string) {
    this.form.patchValue({ logo });
  }

}
