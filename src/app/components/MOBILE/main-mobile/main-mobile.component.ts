import { Component } from '@angular/core';
import {TopBarMobileComponent} from "../top-bar-mobile/top-bar-mobile.component";
import {RouterOutlet} from "@angular/router";
import {RightBarComponent} from "../right-bar/right-bar.component";

@Component({
  selector: 'app-main-mobile',
  standalone: true,
  imports: [
    TopBarMobileComponent,
    RouterOutlet,
    RightBarComponent
  ],
  templateUrl: './main-mobile.component.html',
  styleUrl: './main-mobile.component.css'
})
export class MainMobileComponent {

}
