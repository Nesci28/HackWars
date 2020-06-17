import { Injectable, Type } from '@angular/core';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../components/shared/modal/modal.component';

interface ModalRef<T> extends NgbModalRef {
  componentInstance: T;
}

const defaultModalOptions: NgbModalOptions = {
  backdrop: 'static',
  centered: true,
  keyboard: false,
};

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private ngbModal: NgbModal) {}

  async showBasicModal(options: any): Promise<string> {
    const modalRef = this.showModal(ModalComponent);
    Object.assign(modalRef.componentInstance, options);
    const modalResult = await modalRef.result;
    return modalResult;
  }

  showModal<T>(
    componentType: Type<T>,
    options = defaultModalOptions
  ): ModalRef<T> {
    return this.ngbModal.open(componentType, options);
  }
}
