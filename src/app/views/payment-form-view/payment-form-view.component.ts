import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment-form-view',
  templateUrl: './payment-form-view.component.html',
  styleUrls: ['./payment-form-view.component.css'],
})
export class PaymentFormViewComponent {
  loading: boolean = true;
  valideUser: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.userService.getAuth().subscribe(
      (response) => {
        this.loading = false;
        if (response) {
          this.valideUser = true;
        } else {
          this.valideUser = false;
        }
      },
      (error) => {
        this.loading = false;
        this.valideUser = false;
      }
    );
  }

  redirectToSignIn() {
    this.router.navigate(['/user-access']);
  }
}
