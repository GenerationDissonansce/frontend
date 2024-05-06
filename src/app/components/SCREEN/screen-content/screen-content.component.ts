import { Component } from '@angular/core';
import {NgForOf, NgStyle} from "@angular/common";
import {ScreenIconsService} from "../../../services/screen-icons.service";
import {ScreenIconComponent} from "../../ICONS/screen-icon/screen-icon.component";
import {MouseFollowerIconComponent} from "../../ICONS/mouse-follower-icon/mouse-follower-icon.component";
import {BrowserPageComponent} from "../browser-page/browser-page.component";
import {BrowserService} from "../../../services/browser.service";
import {PageModel} from "../../../models/page.model";

@Component({
  selector: 'app-screen-content',
  standalone: true,
  imports: [
    NgForOf,
    ScreenIconComponent,
    MouseFollowerIconComponent,
    NgStyle,
    BrowserPageComponent
  ],
  templateUrl: './screen-content.component.html',
  styleUrl: './screen-content.component.css'
})
export class ScreenContentComponent {
  public pages: PageModel[] = [];

  constructor(
    public screen_icons_service: ScreenIconsService,
    public browser_service: BrowserService,
  ) {
    this.SubscribeToPagesChanges();
  }

  SubscribeToPagesChanges() {
    this.browser_service.subscribers$.subscribe(()=>{
      this.pages = this.browser_service.pages;
    })
  }
}
