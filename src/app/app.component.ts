import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ScreenComponent} from "./components/SCREEN/screen/screen.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'GenerationalDissonance';

  ngOnInit() {
    this.CalculateSizes();
  }

  CalculateSizes() {
    var height = Math.min(768, Math.max(480, window.innerHeight - 168));
    var width = Math.min(1024, Math.max(640, window.innerWidth - 168));

    if (width * 3 < height * 4) height = width / 4 * 3;
    else width = height / 3 * 4;

    let top_bar_height = 25 * height / 768;
    console.log(top_bar_height);

    document.documentElement.style.setProperty('--screen-width', `${width}px`);
    document.documentElement.style.setProperty('--screen-height', `${height}px`);
    document.documentElement.style.setProperty('--top-bar-height', `${top_bar_height}px`);
  }
}
