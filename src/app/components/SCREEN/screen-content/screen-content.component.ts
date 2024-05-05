import { Component } from '@angular/core';
import {NgForOf, NgStyle} from "@angular/common";
import {ScreenIconsService} from "../../../services/screen-icons.service";
import {ScreenIconComponent} from "../../ICONS/screen-icon/screen-icon.component";
import {MouseFollowerIconComponent} from "../../ICONS/mouse-follower-icon/mouse-follower-icon.component";

@Component({
  selector: 'app-screen-content',
  standalone: true,
  imports: [
    NgForOf,
    ScreenIconComponent,
    MouseFollowerIconComponent,
    NgStyle
  ],
  templateUrl: './screen-content.component.html',
  styleUrl: './screen-content.component.css'
})
export class ScreenContentComponent {
  constructor(
    public screen_icons_service: ScreenIconsService,
  ) {
  }

}
