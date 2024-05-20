import {Component, ViewChild} from '@angular/core';
import {TopBarComponent} from "../top-bar/top-bar.component";
import {ScreenContentComponent} from "../screen-content/screen-content.component";
import {LoadingScreenComponent} from "../../__models/loading-screen/loading-screen.component";
import {UpdatePageService} from "../../../services/update-page.service";

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [
    TopBarComponent,
    ScreenContentComponent,
    LoadingScreenComponent
  ],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css'
})
export class ScreenComponent {
  private readonly LoadingAnimationTime: number = 3000;

  constructor(
    private updatePageService: UpdatePageService,
  ) {
  }
}
