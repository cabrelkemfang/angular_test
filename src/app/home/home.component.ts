import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../core/service/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.clear();
    this.notificationService.success('Logout Successfully');
    this.router.navigate(['/login']);
  }
}
