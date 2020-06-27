import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ServerService } from '../../services/server.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  sshUsername: string;
  sshPassword: string;
  userId: string;

  waitingForServer: boolean = false;
  timer: string;

  timerInterval: any;
  timerCountdownInterval: any;

  form: FormGroup = new FormGroup({
    flag1: new FormControl('', Validators.required),
    flag2: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UserService,
    private serverService: ServerService
  ) {}

  async ngOnInit(): Promise<void> {
    const res = await this.userService.getUser().toPromise();
    this.sshUsername = res.data.sshUsername;
    this.sshPassword = res.data.sshPassword;
  }

  async spinningUpServer(): Promise<void> {
    this.waitingForServer = true;
    try {
      await this.serverService.setServerStatus('starting').toPromise();
    } catch (_) {
      await this.getServerStatus('running');
      return;
    }

    this.timerInterval = setInterval(async () => {
      await this.getServerStatus('running');
    }, 10 * 1000);
  }

  async getServerStatus(status: string): Promise<any> {
    try {
      const res = await this.serverService.getServerStatus(status).toPromise();
      if (res !== null) {
        this.waitingForServer = false;
        this.startTimer(res.data.createdAt);
        clearInterval(this.timerInterval);
      }
    } catch (_) {}
  }

  startTimer(date: string): void {
    let countDownDate: Date | number = new Date(date);
    countDownDate.setHours(countDownDate.getHours() + 2);
    countDownDate = countDownDate.getTime();

    this.timer = this.convertCountDownToString(countDownDate);
    this.timerCountdownInterval = setInterval(() => {
      this.timer = this.convertCountDownToString(
        (countDownDate as number) - new Date().getTime()
      );
    }, 1000);
  }

  convertCountDownToString(epoch: number): string {
    const hours = Math.floor(
      (epoch % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((epoch % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((epoch % (1000 * 60)) / 1000);
    return hours + 'h ' + minutes + 'm ' + seconds + 's ';
  }

  async checkFlag(flagNumber: string): Promise<void> {
    console.log('flagNumber :>> ', flagNumber);
  }
}
