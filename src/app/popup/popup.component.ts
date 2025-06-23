import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { PopupService } from '../services/shared-service'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() isVisible = false;
  @Input() content;
  @Output() close = new EventEmitter<void>();

  constructor(private popupService: PopupService) {}

  ngOnInit() {
    this.popupService.isVisible$.subscribe(isVisible => {
      this.isVisible = JSON.parse(localStorage.getItem("isopenPop") ||'false');//isVisible;
    });
  }

  closePopup() {
    localStorage.setItem("isopenPop", JSON.stringify(false)); // Store as string
    this.popupService.closePopup();  // Close the popup through the service
  }
}

