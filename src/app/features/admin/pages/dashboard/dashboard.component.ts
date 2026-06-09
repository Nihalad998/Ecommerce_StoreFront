import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminDataService } from '../../../../core/services/admin-data.service';
import { AdminSidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';
import { SalesChartComponent } from "../../components/sales-chart/sales-chart.component";
import { RecentOrdersComponent } from '../../components/recent-orders/recent-orders.component';
import { InventoryTableComponent } from "../../components/inventory-table/inventory-table.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminSidebarComponent, SalesChartComponent, RecentOrdersComponent, InventoryTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  readonly adminData = inject(AdminDataService);

}
