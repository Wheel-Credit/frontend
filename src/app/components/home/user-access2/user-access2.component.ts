import { Component } from '@angular/core';

@Component({
  selector: 'app-user-access2',
  templateUrl: './user-access2.component.html',
  styleUrls: ['./user-access2.component.css'],
})
export class UserAccess2Component {
  rightPanelToggle: boolean = false;

  toggleRightPanel() {
    this.rightPanelToggle = !this.rightPanelToggle;
  }
}
