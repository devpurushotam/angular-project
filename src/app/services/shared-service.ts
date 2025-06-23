import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  openPopup() {

    localStorage.setItem("isopenPop", JSON.stringify(true)); // Store as string
    const isOpenPop = JSON.parse(localStorage.getItem("isopenPop") ||'false');

    console.log("isOpenPop", isOpenPop);
// Retrieve and parse to boolean
    this.isVisibleSubject.next(isOpenPop);
  }

  closePopup() {
    this.isVisibleSubject.next(JSON.parse(localStorage.getItem("isopenPop") ||'false'));
  }
}
