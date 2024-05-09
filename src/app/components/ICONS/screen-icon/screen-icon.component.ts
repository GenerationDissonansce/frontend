import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {ScreenIconsService} from "../../../services/screen-icons.service";
import {ScreenIconModel} from "../../../models/screen-icon.model";
import {MouseFollowerIconService} from "../../../services/mouse-follower-icon.service";
import {BrowserPageComponent} from "../../SCREEN/browser-page/browser-page.component";
import {BrowserService} from "../../../services/browser.service";

@Component({
  selector: 'app-screen-icon',
  standalone: true,
  imports: [],
  templateUrl: './screen-icon.component.html',
  styleUrl: './screen-icon.component.css'
})
export class ScreenIconComponent implements AfterViewInit {
  @ViewChild('icon_container') public icon_container: any;
  @Input() icon_id!: number;
  public icon: ScreenIconModel = {};
  public double_click: boolean = false;
  public double_click_reset_time: number = 700;

  constructor(
    public screen_icons_service: ScreenIconsService,
    public mouse_follower: MouseFollowerIconService,
    public browser: BrowserService,
  ) {
    this.subscribeToScreenIconsService();
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.getIcon();
      this.placeIcon();
      this.addMoveListeners();
    })
  }

  subscribeToScreenIconsService() {
    this.screen_icons_service.subscribers$.subscribe(()=>{
      this.icon = this.screen_icons_service.screen_icons[this.icon_id];
      this.placeIcon();
    });
  }

  placeIcon() {
    this.icon_container.nativeElement.style.top = `calc(var(--screen-icon-size) * ${this.icon.y})`;
    this.icon_container.nativeElement.style.left = `calc(var(--screen-icon-size) * ${this.icon.x})`;
  }

  addMoveListeners() {
    this.icon_container.nativeElement.addEventListener('mousedown', (e:any)=>{
      if (this.icon.is_chosen && this.double_click) {
        this.browser.AddPage(this.icon);
        this.screen_icons_service.chooseIcon(undefined);
        this.mouse_follower.setIconId(undefined, 0, 0);
        this.double_click = false;
      } else {
        this.double_click = true;
        setTimeout(()=>{this.double_click = false;}, this.double_click_reset_time);
        this.screen_icons_service.chooseIcon(this.icon_id);
        const pos = this.icon_container.nativeElement.getBoundingClientRect();
        this.mouse_follower.setIconId(this.icon_id, e.clientX - pos.left, e.clientY - pos.top);
      }
    });
  }

  getIcon() {
    this.icon = this.screen_icons_service.screen_icons[this.icon_id];
  }
}
