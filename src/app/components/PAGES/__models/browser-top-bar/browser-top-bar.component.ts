import {Component, Input} from '@angular/core';
import {BrowserService} from "../../../../services/browser.service";

@Component({
  selector: 'app-browser-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './browser-top-bar.component.html',
  styleUrl: './browser-top-bar.component.css'
})
export class BrowserTopBarComponent {
  @Input() page_name!: string;
  @Input() page_id!: number;

  constructor(
    private browser: BrowserService,
  ) {
  }

  Close() {
    this.browser.Close(this.page_id);
  }

  FullScreen() {
    this.browser.FullScreen(this.page_id);
  }
}
