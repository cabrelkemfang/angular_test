import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from '../core/model/loginResponse';
import { LoginService } from '../core/service/login.service';
import { NotificationService } from '../core/service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginLoading: boolean = false;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      log: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loginLoading = true;

      this.loginService.login(this.loginForm.value).subscribe((response: LoginResponse) => {
        sessionStorage.setItem('token', response.token);
        this.notificationService.success(response.message);
        this.loginLoading = false;

        this.router.navigate(['/main']);
      }, (error => {
        this.loginLoading = false;
      }));
    }
  }
}
