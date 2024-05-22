import {Component, Input} from '@angular/core';
import {PageModel} from "../../../../models/page.model";

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.css'
})
export class ServicePageComponent {
  @Input() page!: PageModel;


}
