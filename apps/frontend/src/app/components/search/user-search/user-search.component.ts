import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalUserService, UsersService } from '@momentum/frontend/data';
import { Role, User } from '@momentum/constants';
import { of } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgClass, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { IconComponent } from '@momentum/frontend/icons';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AbstractSearchComponent } from './abstract-search.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'm-user-search',
  templateUrl: './user-search.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IconComponent,
    NgClass,
    NgFor,
    NgxPaginationModule,
    TooltipModule,
    PaginatorModule,
    OverlayPanelModule,
    NgIf,
    NgOptimizedImage,
    RouterLink
  ]
})
export class UserSearchComponent extends AbstractSearchComponent<User> {
  constructor(
    private readonly usersService: UsersService,
    private readonly localUserService: LocalUserService
  ) {
    super();
  }

  protected readonly Role = Role;
  itemsName = 'users';
  protected searchBySteam = false;

  /**
   * Show a button for opening the user profile in a separate tab. Used when a
   * component wants to select a user, not view this profile (e.g. credits
   * picker)
   * */
  @Input() showProfileButton: boolean = false;

  searchRequest(searchString: string) {
    if (this.searchBySteam) {
      if (Number.isNaN(+searchString)) {
        this.search.setErrors({ error: 'Input is not a Steam ID!' });
        return of(null);
      }
      return this.usersService.getUsers({ steamID: searchString });
    } else
      return this.usersService.getUsers({
        search: searchString,
        take: this.rows,
        skip: this.first
      });
  }

  hasRole(role: Role, user: User) {
    return this.localUserService.hasRole(role, user);
  }
}