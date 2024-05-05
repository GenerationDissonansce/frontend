import { Component } from '@angular/core';
import {TopBarComponent} from "../top-bar/top-bar.component";
import {ScreenContentComponent} from "../screen-content/screen-content.component";

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [
    TopBarComponent,
    ScreenContentComponent
  ],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css'
})
export class ScreenComponent {

}
