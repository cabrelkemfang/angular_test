import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { LoginService } from '../core/service/login.service';
import { NotificationService } from '../core/service/notification.service';

import { LoginComponent } from './login.component';
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const loginService = jasmine.createSpyObj('LoginService', ['login']);
const notificationService = jasmine.createSpyObj('NotificationService', ['login']);


export const validUser = {
  log: '00132126',
  password: '123456'
};

export const blankUser = {
  log: '',
  password: ''
};

describe('Login Component Test', () => {

  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let loginComponent: LoginComponent;

  function updateForm(username: string, userPassword: string) {
    fixture.componentInstance.loginForm.controls['log'].setValue(username);
    fixture.componentInstance.loginForm.controls['password'].setValue(userPassword);
  }

  beforeEach(async(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        FormsModule,
        MatSnackBar,
        MatIconModule,
        MatInputModule,
        HttpClient
      ],
      providers: [
        FormBuilder,
        {provide: LoginService, useValue: loginService},
        {provide: NotificationService, useValue: notificationService},
        { provide: Router, useValue: routerSpy }
      ],
      declarations: [LoginComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
  }));


  it('created a form with username and password input and login button', () => {
    // const fixture = TestBed.createComponent(LoginComponent);
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });


  it('Display Username Error Msg when Username is blank', () => {
    updateForm(blankUser.log, validUser.password); 
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#username-error-msg');
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('UserName is required');
  });


  it('Display Password Error Msg when Username is blank', () => {
    updateForm(validUser.log, blankUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Please enter password');
  });


  it('Display Both Username & Password Error Msg when both field is blank', () => {
    updateForm(blankUser.log, blankUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#username-error-msg');
    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');

    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('UserName is required');

    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Password is required');
  });

});





