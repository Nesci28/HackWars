import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-leaderboard-modal',
  templateUrl: './leaderboard-modal.component.html',
  styleUrls: ['./leaderboard-modal.component.scss'],
})
export class LeaderboardModalComponent {
  @Input() steps: { [key: string]: string };
  @Input() title: string;
  @Input() score: number;

  ObjectValues = Object.values;

  titles = {
    '1': 'Signup',
    '2': 'Admin',
    '3': 'SSH',
    '4': 'Zip',
  };

  constructor(private modal: NgbActiveModal) {}

  closeModal(): void {
    this.modal.close();
  }
}
