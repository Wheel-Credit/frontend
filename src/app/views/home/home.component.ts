import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loading: boolean = true;
  valideUser: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
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
    this.router.navigate(['/auth']);
  }
}
