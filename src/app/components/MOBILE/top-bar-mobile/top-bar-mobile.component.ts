import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {RightBarComponent} from "../right-bar/right-bar.component";

@Component({
  selector: 'app-top-bar-mobile',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './top-bar-mobile.component.html',
  styleUrl: './top-bar-mobile.component.css'
})
export class TopBarMobileComponent {
  interact() {
    RightBarComponent.Interact();
  }
}
