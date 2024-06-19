import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-right-bar',
  standalone: true,
        imports: [
                RouterLink
        ],
  templateUrl: './right-bar.component.html',
  styleUrl: './right-bar.component.css'
})
export class RightBarComponent {
  static is_opened: boolean = false;

  static Open() {
    const container = document.getElementById('right-bar-container')!;
    const content = document.getElementById('right-bar-content')!;
    const background = document.getElementById('right-bar-background')!;

    container.style.display='flex';
    setTimeout(()=>{
      content.style.right = '0';
      background.style.opacity = '1';
    });
  }

  static Close() {
    const container = document.getElementById('right-bar-container')!;
    const content = document.getElementById('right-bar-content')!;
    const background = document.getElementById('right-bar-background')!;

    content.style.right = '-100%';
    background.style.opacity = '0';
    setTimeout(()=>{
      container.style.display='none';
    }, 300);
  }

  static Interact() {
    if (RightBarComponent.is_opened) RightBarComponent.Close();
    else RightBarComponent.Open()
    RightBarComponent.is_opened = !RightBarComponent.is_opened;
  }

  interact() {
    RightBarComponent.Interact();
  }
}
