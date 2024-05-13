import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ScreenComponent} from "./components/SCREEN/screen/screen.component";
import {ScreenSizeService} from "./services/screen-size.service";
import {ComputerButtonComponent} from "./components/__models/computer-button/computer-button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScreenComponent, ComputerButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'GenerationalDissonance';

  constructor(
    public screen_size_service: ScreenSizeService,
  ) {
  }

  ngOnInit() {
    this.CalculateSizes();
  }

  CalculateSizes() {
    var height = this.screen_size_service.height;
    var width = this.screen_size_service.width;
    var top_bar_height = 25 * height / 768;
    var icon_size = this.screen_size_service.icon_size;

    document.documentElement.style.setProperty('--screen-width', `${width}px`);
    document.documentElement.style.setProperty('--screen-height', `${height}px`);
    document.documentElement.style.setProperty('--top-bar-height', `${top_bar_height}px`);
    document.documentElement.style.setProperty('--screen-icon-size', `${icon_size}px`);
  }
}
