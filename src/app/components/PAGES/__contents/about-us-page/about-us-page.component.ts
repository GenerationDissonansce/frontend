import {Component, Input} from '@angular/core';
import {PageModel} from "../../../../models/page.model";

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.css'
})
export class AboutUsPageComponent {
  @Input() page!: PageModel;
}
