import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AdminDataService } from '../../../../core/services/admin-data.service';
import { SalesChartComponent } from "../../components/sales-chart/sales-chart.component";
import { RecentOrdersComponent } from '../../components/recent-orders/recent-orders.component';
import { InventoryTableComponent } from "../../components/inventory-table/inventory-table.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SalesChartComponent, RecentOrdersComponent, InventoryTableComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  readonly adminData = inject(AdminDataService);

  ngOnInit(): void {
    this.adminData.loadProducts();
  }

}
