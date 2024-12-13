import {Component, Input} from '@angular/core';
import {PageModel} from "../../../../models/page.model";
import { RouterLink } from "@angular/router";
import { RightBarComponent } from "../../../MOBILE/right-bar/right-bar.component";

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {
  @Input() page!: PageModel;
  
  open() {
    RightBarComponent.Open();
  }
}
