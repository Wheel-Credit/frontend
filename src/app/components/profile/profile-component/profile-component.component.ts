import { AuthModule } from './../../../model/auth.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.css']
})
export class ProfileComponentComponent {
  userData: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.userService.getUserById().subscribe(
      (data) => {
        this.userData = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  defaultImageUrl = 'https://www.selectenglish.co.uk/wp-content/uploads/2022/11/no-user-image.gif';

}
