import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ScreenComponent} from "./components/screen/screen.component";

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
    var height = Math.min(768, Math.max(480, window.innerHeight - 128));
    var width = Math.min(1024, Math.max(640, window.innerWidth - 128));

    if (width * 3 < height * 4) height = width / 4 * 3;
    else width = height / 3 * 4;

    document.documentElement.style.setProperty('--screen-width', `${width}px`);
    document.documentElement.style.setProperty('--screen-height', `${height}px`);
  }
}
