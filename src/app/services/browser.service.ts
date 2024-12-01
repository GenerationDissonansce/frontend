import {Injectable} from '@angular/core';
import {PageModel} from "../models/page.model";
import {ScreenIconModel} from "../models/screen-icon.model";
import {Subject} from "rxjs";
import {UpdatePageService} from "./update-page.service";
import { ScreenSizeService } from "./screen-size.service";

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  public observer = new Subject();
  public subscribers$ = this.observer.asObservable();
  public pages: PageModel[] = [];
  private readonly max_pages_count = 5;

  emitData() {
    this.observer.next({});
  }

  constructor(
    private screenSizeService: ScreenSizeService,
    private updatePagesService: UpdatePageService,
  ) {
    const window_width = this.screenSizeService.width;
    const window_height = this.screenSizeService.height;
    this.pages.push({ name: 'cookie', z_index: 1000, top: window_height - 230, height: 200, width: 400, left: window_width - 430, id: 1000, is_full_screen: false})
  }

  ChoosePage(page: PageModel) {
    for (const page1 of this.pages) {
      if (page1.id == page.id) page1.z_index = 1;
      else page1.z_index = 0;
    }
    this.emitData();
  }

  sleep (time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async AddPage(icon: ScreenIconModel) {
    if (this.pages.length >= this.max_pages_count) {
      let pageId = 0;
      for (const page of this.pages) {
        if (page.name !== 'cookie') {
          pageId = page.id;
          this.updatePagesService.ClosePage(page.id);
          break;
        }
      }
      await this.sleep(300);
      this.pages = this.pages.filter(page => page.id !== pageId);
    }
    for (let i = 0; i < this.pages.length; i++) {
      this.pages[i].z_index = 0;
      this.pages[i].id = i;
    }
    let top: number = 10;
    let left: number = 10;
    while (true) {
      let found = false;
      for (const page of this.pages) if (page.top == top || page.left == left) found = true;
      if (!found) break;
      top += 10;
      left += 10;
    }
    let new_page: PageModel = {
      id: this.pages.length,
      name: '',
      top: top,
      left: left,
      width: 500,
      height: 300,
      z_index: 1,
      is_full_screen: false,
    }
    switch (icon.id) {
      case 0:
        new_page.name = 'service';
        break;
      case 1:
        new_page.name = 'contact';
        break;
      case 2:
        new_page.name = 'about us';
        break;
      case 3:
        new_page.name = 'clothes';
        break;
      default:
        break;
    }
    this.pages.push(new_page);
    this.emitData();
  }

  Resize(id: number, width: number, height: number) {
    let found = false;
    for (const page of this.pages) if (page.id == id) found = true;
    if (!found) return;
    this.pages[id].width = width;
    this.pages[id].height = height;
  }

  MovePage(page_id: number, top: number, left: number) {
    for (let i = 0; i < this.pages.length; i++) {
      if (this.pages[i].id === page_id) {
        this.pages[i].top = top;
        this.pages[i].left = left;
      }
    }
  }

  async Close(id: number) {
    let new_array = [];
    for (let i = 0; i < this.pages.length; i++) {
      if (this.pages[i].id !== id)
        new_array.push(this.pages[i]);
      else {
        this.updatePagesService.ClosePage(this.pages[i].id);
      }
    }
    await this.sleep(300);
    this.pages = new_array;
    this.emitData();
  }

  FullScreen(id: number) {
    for (let i = 0; i < this.pages.length; i++)
      if (this.pages[i].id === id) {
        this.pages[i].is_full_screen = !this.pages[i].is_full_screen;
        this.emitData();
        break;
      }

  }
}
