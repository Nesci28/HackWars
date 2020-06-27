import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('navContent1') navContent: ElementRef;
  _opened = true;
  maxHeight: number;

  isAdmin: boolean = this.authService.isAdmin();

  constructor(private authService: AuthService) {}

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
