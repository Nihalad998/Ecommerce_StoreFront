import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { AdminDataService } from '../../../../core/services/admin-data.service';
import { Chart, registerables } from 'chart.js';
import { AnalyticsService } from '../../../../core/services/analytics.service';
import { isPlatformBrowser } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent implements AfterViewInit {

  readonly adminData = inject(AdminDataService);
  readonly analytics = inject(AnalyticsService);

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID))

  @ViewChild('revenueChart') revenueChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ordersChart') ordersChartRef!: ElementRef<HTMLCanvasElement>;

  @ViewChild('categoryChart') categoryChartRef!: ElementRef<HTMLCanvasElement>;

  private categoryChart!: Chart;

  ngAfterViewInit(): void {
    if(!this.isBrowser) {
      return;
    }

    this.createRevenueChart();
    this.createOrdersChart();
    this.createCategoryChart();
  }
  ngOnInit(): void {
    this.analytics.loadCategoryDistribution().subscribe(response => 
      {
        const counts = response.products.reduce(
            (
              acc: Record<string, number>,
              product: any
            ) => {

              acc[product.category] = (acc[product.category] || 0) + 1;

              return acc;
            },
            {}
          );
        this.analytics.categoryLabels.set(
          Object.keys(counts)
        );
        this.analytics.categoryValues.set(
          Object.values(counts)
        );
        
        queueMicrotask(() => {
          this.updateCategoryChart();
        })

      });

  }


  private createRevenueChart(): void {
    new Chart(
      this.revenueChartRef.nativeElement,
      {
        type: 'line',
        data: {
          labels: [
            'Jan','Feb','Mar','Apr','May','Jun'
          ],
          datasets: [
            {
              label: 'Revenue',
              data: this.analytics.monthlyRevenue(),
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    );
  }

  private createOrdersChart(): void {
    new Chart(
      this.ordersChartRef.nativeElement,
      {
        type: 'bar',
        data: {
          labels: [
            'Jan','Feb','Mar','Apr','May','Jun'
          ],
          datasets: [
            {
              label: 'Orders',
              data: this.analytics.monthlyOrders()
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    );
  }

  private createCategoryChart(): void {
    this.categoryChart = new Chart(
      this.categoryChartRef.nativeElement,
      {
        type: 'pie',
        data: {
          labels: this.analytics.categoryLabels(),
          datasets: [
            {
              data: this.analytics.categoryValues()
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    );
  }

  private updateCategoryChart(): void {
    if (!this.categoryChart) {
      return;
    }

    this.categoryChart.data.labels = this.analytics.categoryLabels();

    this.categoryChart.data.datasets[0].data = this.analytics.categoryValues();

    this.categoryChart.update();

  }

}
