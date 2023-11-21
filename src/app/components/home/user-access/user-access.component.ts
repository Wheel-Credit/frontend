import { Component } from '@angular/core';
import { UserModule } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
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
import { MatSnackBar } from '@angular/material/snack-bar';

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

  user!: UserModule;
  nameControl: string = '';
  lastNameControl: string = '';
  emailSignUpControl: string = '';
  passwordSignUpControl: string = '';
  passwordConfirmSignUpControl: string = '';
  emailLoginControl: string = '';
  passwordLoginControl: string = '';

  rightPanelActive: boolean = false;
  requiredInfo: boolean = false;
  flashError = false;
  incorrectLogin = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
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
      this.snackBar.open('You have signed up successfully', '', {
        duration: 2000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
    });
  }

  onSubmitLogin() {
    if (this.validateLogIn()) return;

    this.user.email = this.emailLoginControl;
    this.user.password = this.passwordLoginControl;

    this.authService.login(this.user).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('id', response.user_id);
        this.snackBar.open('You have logged in successfully', '', {
          duration: 2000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      (error: any) => {
        this.incorrectLogin = true;
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
