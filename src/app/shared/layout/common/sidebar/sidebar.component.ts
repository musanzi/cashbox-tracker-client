import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../auth/data-access/auth.service';
import { ApiImgPipe } from '../../../pipes/api-img.pipe';
import { IAPIResponse } from '../../../services/api/types/api-response.type';
import { adminLinks } from '../../../utils/data/links';
import { IUser } from '../../../utils/types/models.type';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatIconModule, RouterModule, ApiImgPipe],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  #authService = inject(AuthService);
  user = input.required<IUser>();
  logout$: Observable<IAPIResponse<void>>;
  adminLinks = adminLinks;

  signOut(): void {
    this.logout$ = this.#authService.signOut();
  }
}
