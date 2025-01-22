import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-card',
  imports: [],
  templateUrl: './auth-card.component.html'
})
export class AuthCardComponent {
  title = input.required<string>();
}
