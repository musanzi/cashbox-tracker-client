import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthCardComponent } from '../../ui/auth-card/auth-card.component';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { AuthService } from '../../data-access/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule,
    CommonModule,
    AuthCardComponent
  ]
})
export class AuthForgotPasswordComponent {
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  forgotPasswordForm: FormGroup;
  forgotPassword$: Observable<IAPIResponse<void>>;

  constructor() {
    this.forgotPasswordForm = this.#formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submitForgotPassword(): void {
    if (!this.forgotPasswordForm.invalid) {
      this.forgotPassword$ = this.#authService.forgotPassword(this.forgotPasswordForm.value);
    }
  }
}
