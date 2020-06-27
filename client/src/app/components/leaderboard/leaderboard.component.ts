import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../../services/leaderboard.service';
import { ModalService } from '../../services/modal.service';
import { LeaderboardModalComponent } from './leaderboard-modal/leaderboard-modal.component';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  leaderboard: any;

  constructor(
    private leaderboardService: LeaderboardService,
    private modalService: ModalService
  ) {}

  async ngOnInit(): Promise<void> {
    this.leaderboard = await this.leaderboardService
      .getLeaderboard()
      .toPromise();
  }

  async showProfile(userId: string): Promise<void> {
    this.leaderboardService.getUserProfile(userId).subscribe(
      (res: any) => {
        this.modalService.showBasicModal(LeaderboardModalComponent, {
          title: res.data.username,
          score: res.data.score,
          steps: res.data.steps,
        });
      },
      (err) => {
        console.log('err :>> ', err);
      }
    );
  }
}
