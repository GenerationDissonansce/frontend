import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {PageModel} from "../../../models/page.model";
import {BrowserService} from "../../../services/browser.service";
import {BrowserScrollbarComponent} from "../../PAGES/__models/browser-scrollbar/browser-scrollbar.component";
import {ServicePageComponent} from "../../PAGES/__contents/service-page/service-page.component";
import {BrowserTopBarComponent} from "../../PAGES/__models/browser-top-bar/browser-top-bar.component";
import {
  BrowserAddressContainerComponent
} from "../../PAGES/__models/browser-address-container/browser-address-container.component";
import {BrowserBottomBarComponent} from "../../PAGES/__models/browser-bottom-bar/browser-bottom-bar.component";
import {NgIf} from "@angular/common";
import {UpdatePageService} from "../../../services/update-page.service";
import {GamePageComponent} from "../../PAGES/__contents/game-page/game-page.component";
import {AboutUsPageComponent} from "../../PAGES/__contents/about-us-page/about-us-page.component";
import {ContactPageComponent} from "../../PAGES/__contents/contact-page/contact-page.component";

@Component({
  selector: 'app-browser-page',
  standalone: true,
  imports: [
    BrowserScrollbarComponent,
    ServicePageComponent,
    BrowserTopBarComponent,
    BrowserAddressContainerComponent,
    BrowserBottomBarComponent,
    NgIf,
    GamePageComponent,
    AboutUsPageComponent,
    ContactPageComponent
  ],
  templateUrl: './browser-page.component.html',
  styleUrl: './browser-page.component.css'
})
export class BrowserPageComponent implements AfterViewInit {
  @ViewChild('page_container') page_container: any;
  @ViewChild('scroll_container') scroll_container: any;
  @ViewChild('top_bar') top_bar: any;
  @Input() public page: PageModel = {id: 0};
  is_sticking: boolean = false;
  minus_x: number = 0;
  minus_y: number = 0;

  constructor(
    private browser: BrowserService,
    private updatePageService: UpdatePageService,
  ) {
    this.browser.subscribers$.subscribe(()=>{
      this.DefaultSize();
    });
    this.updatePageService.subscribers$.subscribe((e:any) => {
      const percent = e.percent;
      const height = this.scroll_container.nativeElement.scrollHeight - this.scroll_container.nativeElement.getBoundingClientRect().height;
      this.scroll_container.nativeElement.scrollTop = height * percent;
    });
    this.updatePageService.close_pages_subscribers$.subscribe((e:any) => {
      if (e.id === this.page.id)
        this.page_container.nativeElement.style.transform = 'scale(0)';
    })
  }

  ngAfterViewInit() {
    this.DefaultSize();
    setTimeout(() => {
      this.page_container.nativeElement.style.transform = 'scale(1)';
    });

    this.addListeners();
  }

  getPageContentHeight() {
    if (this.page.is_full_screen)
      return `calc(${this.page_container.nativeElement.getBoundingClientRect().height}px - 64px)`;
    else
      return `calc(${this.page.height}px - 64px)`;
  }

  DefaultSize() {
    if (this.page.is_full_screen) {
      const containerPos = document.getElementById('screen-container')!.getBoundingClientRect();
      this.page_container.nativeElement.style.width = `100%`;
      this.page_container.nativeElement.style.height = `${containerPos.height}px`;
      this.page_container.nativeElement.style.top = `0`;
      this.page_container.nativeElement.style.left = `0`;
    } else {
      this.page_container.nativeElement.style.width = `${this.page.width}px`;
      this.page_container.nativeElement.style.height = `${this.page.height}px`;
      this.page_container.nativeElement.style.top = `${this.page.top}px`;
      this.page_container.nativeElement.style.left = `${this.page.left}px`;
    }
    this.updatePageService.ResizeEmitData([this.page.width!, this.page.height!, this.page.is_full_screen?1:0]);
    this.page_container.nativeElement.style.display = 'flex';
  }

  ChoosePage() {
    this.browser.ChoosePage(this.page);
  }

  ResizeListener(value: number[]) {
    this.page.width = value[0];
    this.page_container.nativeElement.style.width = `${this.page.width}px`;
    this.page.height = value[1];
    this.page_container.nativeElement.style.height = `${this.page.height}px`;
    this.updatePageService.ResizeEmitData(value);
  }

  addListeners() {
    let stick_page = (e: any) => {
      if (this.is_sticking) {
        const containerPos = document.getElementById('screen-container')!.getBoundingClientRect();
        const pagePos = this.page_container.nativeElement.getBoundingClientRect();
        let top = Math.max(0, Math.min(e.clientY - this.minus_y - containerPos.top, containerPos.height - pagePos.height));
        let left = Math.max(0, Math.min(e.clientX - this.minus_x - containerPos.left, containerPos.width - pagePos.width));
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
    let scroll_listener = () => {
      let percent = Math.min(1, this.scroll_container.nativeElement.scrollTop / (this.scroll_container.nativeElement.scrollHeight - this.scroll_container.nativeElement.getBoundingClientRect().height));
      this.updatePageService.ScrollBarEmitData(percent);
    }

    this.top_bar.nativeElement.addEventListener('mousedown', (e: any) => {
      this.ChoosePage();
      this.is_sticking = true;
      this.minus_x = e.clientX - this.page_container.nativeElement.getBoundingClientRect().left;
      this.minus_y = e.clientY - this.page_container.nativeElement.getBoundingClientRect().top;
      addEventListener('mousemove', stick_page);
      addEventListener('mouseup', mouse_up_listen);
    });
    this.scroll_container.nativeElement.addEventListener('scroll', scroll_listener);
  }
}
