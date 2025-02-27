import { Component, inject, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IUser } from '../../utils/types/models.type';
import { ApiImgPipe } from '../../pipes/api-img.pipe';
import { AuthService } from '../../../auth/data-access/auth.service';
import { IAPIResponse } from '../../services/api/types/api-response.type';
import { Observable } from 'rxjs';
import { adminLinks } from '../../utils/data/links';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatIconModule, NgOptimizedImage, RouterModule, ApiImgPipe],
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
