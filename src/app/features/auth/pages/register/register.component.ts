import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@features/auth/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgOptimizedImage],
  providers: [AuthService],
})
export default class RegisterComponent {
  #authService = inject(AuthService);
  #router = inject(Router);

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });;


  register() {
    this.#authService.register(this.form.value).subscribe(() => this.goToHome());
  }

  goToHome() {
    this.#router.navigate(['']);
  }
}
