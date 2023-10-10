import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  valideUser: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.userService.getAuth().subscribe(
      (response) => {
        if (response) {
          this.valideUser = true;
        } else {
          this.valideUser = false;
        }
      },
      (error) => {
        this.valideUser = false;
      }
    );
  }

  redirectToSignIn() {
    this.router.navigate(['/user-access']);
  }
}
