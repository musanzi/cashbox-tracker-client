import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { AuthCardComponent } from '../../ui/auth-card/auth-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { IUser } from 'app/shared/utils/types/models.type';
import { AuthService } from '../../data-access/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    AuthCardComponent
  ]
})
export class AuthSignInComponent {
  #formBuilder: FormBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  #route = inject(ActivatedRoute);
  redirectUrl = signal<string>(this.#route.snapshot.queryParams?.redirectUrl || '/');
  signInForm: FormGroup;
  signIn$: Observable<IAPIResponse<IUser>>;

  constructor() {
    this.signInForm = this.#formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSignIn(): void {
    if (this.signInForm.invalid) return;
    this.signInForm.disable();
    this.signIn$ = this.#authService.signIn(this.signInForm.value, this.redirectUrl());
    this.signInForm.enable();
  }
}
