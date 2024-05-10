import {Component, Input} from '@angular/core';
import {PageModel} from "../../../../models/page.model";

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent {
  @Input() page!: PageModel;
}
