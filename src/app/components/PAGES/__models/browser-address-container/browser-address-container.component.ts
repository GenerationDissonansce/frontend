import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-browser-address-container',
  standalone: true,
  imports: [],
  templateUrl: './browser-address-container.component.html',
  styleUrl: './browser-address-container.component.css'
})
export class BrowserAddressContainerComponent {
  @Input() page_name!: string;
}
