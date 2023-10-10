import { Component } from '@angular/core';
import { UserModule } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.css'],
  animations: [
    trigger('flashErrorMessage', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('show => hide', animate('1000ms')),
      transition('hide => show', animate('1000ms')),
    ]),
  ],
})
export class UserAccessComponent {
  signupForm: FormGroup;
  loginForm: FormGroup;

  rightPanelActive: boolean = false;
  user!: UserModule;
  nameControl: string = '';
  lastNameControl: string = '';
  emailSignUpControl: string = '';
  passwordSignUpControl: string = '';
  passwordConfirmSignUpControl: string = '';
  emailLoginControl: string = '';
  passwordLoginControl: string = '';

  requiredInfo: boolean = false;
  flashError = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.user = {} as UserModule;

    this.signupForm = this.fb.group(
      {
        nameControl: ['', Validators.required],
        lastNameControl: ['', Validators.required],
        emailSignUpControl: ['', [Validators.required, Validators.email]],
        passwordSignUpControl: ['', Validators.required],
        passwordConfirmSignUpControl: ['', Validators.required],
      },
      { validator: passwordMatchValidator() }
    );

    this.loginForm = this.fb.group({
      emailLoginControl: ['', [Validators.required, Validators.email]],
      passwordLoginControl: ['', Validators.required],
    });
  }

  toggleRightPanel() {
    this.rightPanelActive = !this.rightPanelActive;
  }

  onSubmitSignUp() {
    if (this.validateSignUp()) return;
    this.user.name = this.nameControl;
    this.user.lastname = this.lastNameControl;
    this.user.email = this.emailSignUpControl;
    this.user.password = this.passwordSignUpControl;
    this.authService.signup(this.user).subscribe((response: any) => {
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('id', response.user_id);
      this.router.navigate(['/home']);
    });
  }

  onSubmitLogin() {
    if (this.validateLogIn()) return;
    this.user.name = this.nameControl;
    this.user.password = this.passwordSignUpControl;
    this.authService.login(this.user).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('id', response.user_id);
        console.log(response);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.log('aaaaa ' + error);
      }
    );
  }

  validateSignUp() {
    if (
      this.signupForm?.get('nameControl')?.hasError('required') ||
      this.signupForm?.get('lastNameControl')?.hasError('required') ||
      this.signupForm?.get('emailSignUpControl')?.hasError('required') ||
      this.signupForm?.get('emailSignUpControl')?.hasError('email') ||
      this.signupForm?.get('passwordSignUpControl')?.hasError('required') ||
      this.signupForm
        ?.get('passwordConfirmSignUpControl')
        ?.hasError('required') ||
      this.signupForm?.hasError('passwordMismatch')
    ) {
      this.flashError = true;
      setTimeout(() => {
        this.flashError = false;
      }, 1000);
      return true;
    }
    return false;
  }

  validateLogIn() {
    if (
      this.loginForm?.get('emailLoginControl')?.hasError('required') ||
      this.loginForm?.get('emailLoginControl')?.hasError('email') ||
      this.loginForm?.get('passwordLoginControl')?.hasError('required')
    ) {
      this.flashError = true;
      setTimeout(() => {
        this.flashError = false;
      }, 1000);
      return true;
    }
    return false;
  }
}

function passwordMatchValidatorFn(
  formGroup: FormGroup
): ValidationErrors | null {
  const password = formGroup.get('passwordSignUpControl')?.value;
  const confirmPassword = formGroup.get('passwordConfirmSignUpControl')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}

export function passwordMatchValidator(): (
  formGroup: FormGroup
) => ValidationErrors | null {
  return passwordMatchValidatorFn;
}
