import {Component, Input} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {PageModel} from "../../../../../models/page.model";

@Component({
  selector: 'app-shop-main-page',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './shop-main-page.component.html',
  styleUrl: './shop-main-page.component.css'
})
export class ShopMainPageComponent {
  @Input() page!: PageModel;

  onOutletLoaded(component: any) {
    component.page = this.page;
  }
}
