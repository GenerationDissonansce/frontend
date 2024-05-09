import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {PageModel} from "../../../models/page.model";
import {BrowserService} from "../../../services/browser.service";
import {ScreenSizeService} from "../../../services/screen-size.service";
import {BrowserScrollbarComponent} from "../../PAGES/__models/browser-scrollbar/browser-scrollbar.component";
import {ServicePageComponent} from "../../PAGES/service-page/service-page.component";
import {BrowserTopBarComponent} from "../../PAGES/__models/browser-top-bar/browser-top-bar.component";
import {
  BrowserAddressContainerComponent
} from "../../PAGES/__models/browser-address-container/browser-address-container.component";
import {BrowserBottomBarComponent} from "../../PAGES/__models/browser-bottom-bar/browser-bottom-bar.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-browser-page',
  standalone: true,
  imports: [
    BrowserScrollbarComponent,
    ServicePageComponent,
    BrowserTopBarComponent,
    BrowserAddressContainerComponent,
    BrowserBottomBarComponent,
    NgIf
  ],
  templateUrl: './browser-page.component.html',
  styleUrl: './browser-page.component.css'
})
export class BrowserPageComponent implements AfterViewInit {
  @ViewChild('page_container') public page_container: any;
  @ViewChild('top_bar') public top_bar: any;
  @Input() public page: PageModel = {id: 0};
  is_sticking: boolean = false;
  minus_x: number = 0;
  minus_y: number = 0;

  constructor(
    private browser: BrowserService,
    private screen_size: ScreenSizeService,
  ) {
    this.browser.subscribers$.subscribe(() => {
      this.DefaultSize();
    });
  }

  ngAfterViewInit() {
    this.DefaultSize();
    setTimeout(() => {
      this.page_container.nativeElement.style.transform = 'scale(1)';
    });

    this.addListeners();
  }

  DefaultSize() {
    this.page_container.nativeElement.style.width = `${this.page.width}px`;
    this.page_container.nativeElement.style.height = `${this.page.height}px`;
    this.page_container.nativeElement.style.top = `${this.page.top}px`;
    this.page_container.nativeElement.style.left = `${this.page.left}px`;
    this.page_container.nativeElement.style.display = 'flex';
  }

  ChoosePage() {
    this.browser.ChoosePage(this.page);
  }

  addListeners() {
    let stick_page = (e: any) => {
      if (this.is_sticking) {
        const containerPos = document.getElementById('screen-container')!.getBoundingClientRect();
        const pagePos = this.page_container.nativeElement.getBoundingClientRect();
        let top = Math.max(0, Math.min(e.clientY - this.minus_y - containerPos.top, this.screen_size.height - pagePos.height));
        let left = Math.max(0, Math.min(e.clientX - this.minus_x - containerPos.left, this.screen_size.width - pagePos.width));
        this.page_container.nativeElement.style.top = `${top}px`;
        this.page_container.nativeElement.style.left = `${left}px`;
        this.browser.MovePage(top, left);
      }
    }
    let mouse_up_listen = () => {
      this.is_sticking = false;
      removeEventListener('mousemove', stick_page);
      removeEventListener('mouseup', mouse_up_listen);
    }

    new ResizeObserver(() => {
      const size = this.page_container.nativeElement.getBoundingClientRect();
      this.browser.Resize(this.page.id, size.width, size.height);
    }).observe(this.page_container.nativeElement);

    this.top_bar.nativeElement.addEventListener('mousedown', (e: any) => {
      this.ChoosePage();
      this.is_sticking = true;
      this.minus_x = e.clientX - this.page_container.nativeElement.getBoundingClientRect().left;
      this.minus_y = e.clientY - this.page_container.nativeElement.getBoundingClientRect().top;
      addEventListener('mousemove', stick_page);
      addEventListener('mouseup', mouse_up_listen);
    })
  }
}
