import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { CategoryScale, Chart, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Tooltip } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Tooltip, Legend, Filler);

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  imports: [],
  templateUrl: './sales-chart.component.html',
  styleUrl: './sales-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesChartComponent implements AfterViewInit {

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void{
    new Chart(this.chartCanvas.nativeElement,
      {
        type: 'line',
        data: {
          labels: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' 
          ],
          datasets: [
            {
              label: 'Revenue',
              data: [
                12000, 18000, 25000, 22000, 31000, 42000, 48000, 53000, 61000, 72000, 80000, 84250
              ],
              borderColor: '#6366f1',
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
              fill: true,
              tension: 0.4
            }
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#fff'
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: '#94a3b8'
              },
              grid: {
                color: '#1e293b'
              }
            },
            y: {
              ticks: {
                color: '#94a3b8'
              },
              grid: {
                color: '#1e293b'
              }
            }
          }
        }
      }
    );
  }
}
