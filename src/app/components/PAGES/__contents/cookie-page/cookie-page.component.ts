import {Component, Input} from '@angular/core';
import {PageModel} from "../../../../models/page.model";
import { BrowserService } from "../../../../services/browser.service";

@Component({
  selector: 'app-cookie-page',
  standalone: true,
  imports: [],
  templateUrl: './cookie-page.component.html',
  styleUrl: './cookie-page.component.css'
})
export class CookiePageComponent {
  @Input() page!: PageModel;

  constructor(
    private browser: BrowserService,
  ) {}

  closeWindow() {
    this.browser.Close(this.page.id);
  }
}
