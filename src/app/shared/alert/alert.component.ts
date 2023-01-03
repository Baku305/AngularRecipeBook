import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/modal.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  constructor(private modalService: ModalService) {}

  modalMessage!: string;
  modalMessageSub!: Subscription;
  modalError!: boolean;
  modalErrorSub!: Subscription;

  ngOnInit(): void {
    this.modalMessageSub = this.modalService.onModalmessage.subscribe(
      (message) => (this.modalMessage = message)
    );

    this.modalErrorSub = this.modalService.onModalError.subscribe(
      (modal) => (this.modalError = modal)
    );
  }

  ngOnDestroy(): void {
    this.modalErrorSub.unsubscribe();
    this.modalMessageSub.unsubscribe();
  }

  onModalClose() {
    this.modalService.onModalError.next(false);
  }
}
