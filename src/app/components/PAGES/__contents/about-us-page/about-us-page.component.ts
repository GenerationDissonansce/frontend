import {Component, Input} from '@angular/core';
import {PageModel} from "../../../../models/page.model";
import { RouterLink } from "@angular/router";
import { RightBarComponent } from "../../../MOBILE/right-bar/right-bar.component";

@Component({
  selector: 'app-about-us-page',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.css'
})
export class AboutUsPageComponent {
  @Input() page!: PageModel;
  
  open() {
    RightBarComponent.Open();
  }
}
