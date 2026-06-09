import { ChangeDetectionStrategy, Component, inject, computed, signal, DestroyRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


import { AdminDataService } from '../../../../core/services/admin-data.service';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-recent-orders',
  standalone: true,
  imports: [],
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentOrdersComponent implements AfterViewInit {

  readonly adminData = inject(AdminDataService);

  private destroyRef = inject(DestroyRef);

  readonly searchTerm = signal('');

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  readonly filteredOrders = computed(() => {
    
    const search = this.searchTerm().toLowerCase().trim();

    if(!search) {
      return this.adminData.recentOrders();
    }

    return this.adminData.recentOrders().filter(
      order => 
        order.customer.toLowerCase().includes(search) 
        || 
        order.id.toLowerCase().includes(search)
        || 
        order.status.toLowerCase().includes(search)
      );

  });

  ngAfterViewInit(): void {

    fromEvent(this.searchInput.nativeElement, 'input').pipe(
      map(
        event => 
          (event.target as HTMLInputElement).value),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(value => {
        this.searchTerm.set(value);
      });
  }

}

  


