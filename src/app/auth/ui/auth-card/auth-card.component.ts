import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth-card',
  imports: [RouterModule, MatIconModule],
  templateUrl: './auth-card.component.html'
})
export class AuthCardComponent {
  title = input.required<string>();
}
