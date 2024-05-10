import {Component, Input} from '@angular/core';
import {PageModel} from "../../../../models/page.model";

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {
  @Input() page!: PageModel;
}
