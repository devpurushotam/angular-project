import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ReloadService {
  private hasReloaded = false;

  setReloaded(): void {
    this.hasReloaded = true;
  }

  getReloaded(): boolean {
    return this.hasReloaded;
  }
}
