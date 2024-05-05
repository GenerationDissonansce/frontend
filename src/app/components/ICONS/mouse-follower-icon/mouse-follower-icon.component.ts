import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ScreenIconModel} from "../../../models/screen-icon.model";
import {MouseFollowerIconService} from "../../../services/mouse-follower-icon.service";
import {ScreenIconsService} from "../../../services/screen-icons.service";
import {ScreenSizeService} from "../../../services/screen-size.service";

@Component({
  selector: 'app-mouse-follower-icon',
  standalone: true,
  imports: [],
  templateUrl: './mouse-follower-icon.component.html',
  styleUrls: ['./mouse-follower-icon.component.css', '../screen-icon/screen-icon.component.css']
})
export class MouseFollowerIconComponent implements AfterViewInit {
  @ViewChild('icon_container') public icon_container: any;
  public icon: ScreenIconModel = {};
  private minus_x!: number;
  private minus_y!: number;

  constructor(
    private screen_size: ScreenSizeService,
    private mouse_follower_icon_service: MouseFollowerIconService,
    private screen_icons: ScreenIconsService,
  ) {}

  ngAfterViewInit() {
    this.mouse_follower_icon_service.subscribers$.subscribe(()=>{
      if (this.mouse_follower_icon_service.icon_id == undefined) {
        this.icon_container.nativeElement.style.display = 'none';
      } else {
        this.icon = this.screen_icons.screen_icons[this.mouse_follower_icon_service.icon_id!];
        this.minus_y = this.mouse_follower_icon_service.minus_y;
        this.minus_x = this.mouse_follower_icon_service.minus_x;
        this.placeIcon();
        this.addListeners();
        this.icon_container.nativeElement.style.display = 'flex';
      }
    });
  }

  placeIcon() {
    this.icon_container.nativeElement.style.top = `calc(var(--screen-icon-size) * ${this.icon.y})`;
    this.icon_container.nativeElement.style.left = `calc(var(--screen-icon-size) * ${this.icon.x})`;
  }

  addListeners() {
    let moveListener = (e:any) => {
      const containerPos = document.getElementById('screen-container')!.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - containerPos.left - this.minus_x, this.screen_size.width - (this.screen_size.icon_size + this.screen_size.width % this.screen_size.icon_size)));
      const y = Math.max(0, Math.min(e.clientY - containerPos.top - this.minus_y, this.screen_size.height - (this.screen_size.icon_size + this.screen_size.height % this.screen_size.icon_size)));
      this.icon_container.nativeElement.style.top = `${y}px`;
      this.icon_container.nativeElement.style.left = `${x}px`;
    };
    let mouseupListener = (e: any) => {
      const containerPos = document.getElementById('screen-container')!.getBoundingClientRect();
      const rect = this.icon_container.nativeElement.getBoundingClientRect();
      const result_rect: {top: number, left: number, right: number, bottom: number} = {
        top: rect.top - containerPos.top,
        left: rect.left - containerPos.left,
        bottom: rect.bottom - containerPos.top,
        right: rect.right - containerPos.left,
      }
      this.screen_icons.moveIcon(this.mouse_follower_icon_service.icon_id!, result_rect);
      this.mouse_follower_icon_service.setIconId(undefined, 0, 0);
      removeEventListener('mousemove', moveListener);
      removeEventListener('mouseup', mouseupListener)
    };
    addEventListener('mousemove', moveListener);
    addEventListener('mouseup', mouseupListener);
  }
}
