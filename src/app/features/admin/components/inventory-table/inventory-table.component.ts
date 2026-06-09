import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminDataService } from '../../../../core/services/admin-data.service';

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [],
  templateUrl: './inventory-table.component.html',
  styleUrl: './inventory-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryTableComponent {

  readonly adminData = inject(AdminDataService);
}
