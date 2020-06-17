import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ModalService } from '../../services/modal.service';
import { StepsService } from '../../services/steps.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('navContent1') navContent: ElementRef;
  _opened = true;
  maxHeight: number;

  isStepDone: any;

  showHint: boolean = false;

  constructor(
    private stepsService: StepsService,
    private modalService: ModalService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isStepDone = await this.stepsService.isStepDone('1').toPromise();
    if (!this.isStepDone.data) {
      const modalResult = await this.modalService.showBasicModal({
        title: 'You succesfully signed up!',
        text:
          "That's a first in the history of internet!  Someone succesfully signed up to a website!",
        button2: 'Save',
      });
      await this.stepsService.stepDone('1', modalResult).toPromise();
    }
  }

  async collapse(v: boolean): Promise<void> {
    if (v) {
      this._opened = !this._opened;
    }
    if (!v) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
    this.maxHeight = !this._opened
      ? this.navContent.nativeElement.offsetHeight + 16
      : 0;
  }
}
