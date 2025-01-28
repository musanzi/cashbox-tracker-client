import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { adminLinks } from '../../utils/data/links';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IUser } from '../../../shared/utils/types/models.type';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { AuthService } from '../../../auth/data-access/auth.service';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { Observable } from 'rxjs';

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
