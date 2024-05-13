import {Component, ViewChild} from '@angular/core';
import {UpdatePageService} from "../../../services/update-page.service";

@Component({
  selector: 'app-computer-button',
  standalone: true,
  imports: [],
  templateUrl: './computer-button.component.html',
  styleUrl: './computer-button.component.css'
})
export class ComputerButtonComponent {
  @ViewChild('btn') btn: any;
  private isTurnedOn: boolean = false;

  constructor(
    private updatePageService: UpdatePageService,
  ) {
  }

  TurnButtonOn() {
    this.btn.nativeElement.style.animation = 'green_animation 2s infinite';
    this.btn.nativeElement.style.background = 'green';
  }

  TurnOn() {
    if (this.isTurnedOn) return;
    this.isTurnedOn = true;
    this.TurnButtonOn();
    this.updatePageService.LoadScreen();
  }
}
