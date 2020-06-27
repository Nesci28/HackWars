import { Component, OnInit } from '@angular/core';

import { ModalService } from '../../services/modal.service';
import { StepsService } from '../../services/steps.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isStepDone: any;

  showHint: boolean = false;

  constructor(
    private stepsService: StepsService,
    private modalService: ModalService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isStepDone = await this.stepsService.isStepDone('1').toPromise();
    if (!this.isStepDone.data) {
      const modalResult = await this.modalService.showBasicModal(
        ModalComponent,
        {
          title: 'You succesfully signed up!',
          text:
            "That's a first in the history of internet!  Someone succesfully signed up to a website!",
          button2: 'Save',
        }
      );
      await this.stepsService.stepDone('1', modalResult).toPromise();
    }
  }
}
