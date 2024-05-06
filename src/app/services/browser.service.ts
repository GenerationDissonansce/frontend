import { Injectable } from '@angular/core';
import {PageModel} from "../models/page.model";
import {ScreenIconModel} from "../models/screen-icon.model";
import {Subject} from "rxjs";

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

  constructor() { }

  ChoosePage(page: PageModel) {
    for (const page1 of this.pages) {
      if (page1.id == page.id) page1.z_index = 1;
      else page1.z_index = 0;
    }
    this.emitData();
  }

  AddPage(icon: ScreenIconModel) {
    if (this.pages.length >= this.max_pages_count) this.pages.shift();
    for (const page of this.pages) page.z_index = 0;
    let top: number = 10;
    let left: number = 10;
    while (true) {
      let found = false;
      for (const page of this.pages) if (page.top == top || page.left == left) found=true;
      if (!found) break;
      top += 10; left += 10;
    }
    let new_page: PageModel = {
      id: this.pages.length,
      name: '',
      top: top,
      left: left,
      width: 300,
      z_index: 1,
    }
    switch (icon.id) {
      case 0:
        new_page.name = 'service';
        break;
      case 1:
        new_page.name = 'contact';
        break;
      case 2:
        new_page.name = 'about-us';
        break;
      case 3:
        new_page.name = 'games';
        break;
      default:
        break;
    }
    this.pages.push(new_page);
    this.emitData();
  }

  Resize(id:number, width: number, height: number) {
    this.pages[id].width = width;
    this.pages[id].height = height;
  }

  MovePage(top: number, left: number) {
    this.pages[this.pages.length-1].top = top;
    this.pages[this.pages.length-1].left = left;
  }
}
