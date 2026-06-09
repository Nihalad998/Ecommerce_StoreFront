import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminStoreService {

  private readonly searchSubject = new BehaviorSubject<string>('');

  readonly search$ = this.searchSubject.asObservable();

  updateSearch(value: string): void {
    this.searchSubject.next(value);
  }

}