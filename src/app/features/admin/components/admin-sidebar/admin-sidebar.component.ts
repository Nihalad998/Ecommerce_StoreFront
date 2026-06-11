import { ChangeDetectionStrategy, Component,  input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSidebarComponent {

  menuOpen = input(false);
  closeMenu = output<void>();

}
