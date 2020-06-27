import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../shared/modal/modal.component';
import { StepsService } from '../../services/steps.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  stepDoneBanner: boolean = false;
  showHint1: boolean = false;
  showHint2: boolean = false;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private adminService: AdminService,
    private modalService: ModalService,
    private stepsService: StepsService,
    private router: Router
  ) {}

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  async login(): Promise<void> {
    this.stepDoneBanner = false;
    this.adminService.login(this.username.value, this.password.value).subscribe(
      async (res) => {
        if (res.statusCode === 200) {
          this.stepDoneBanner = true;
          localStorage.setItem('authorization', res.data);
          const modalResult = await this.modalService.showBasicModal(
            ModalComponent,
            {
              title: "What's Up Admin!",
              text:
                'Looks like you remembered the formation I gave to all the Admins...',
              button2: 'Save',
            }
          );
          await this.stepsService.stepDone('2', modalResult).toPromise();
          location.href = `${environment.homepage}/admin/dashboard`;
        }
      },
      (err) => {
        console.log('err :>> ', err);
      }
    );
  }
}
