import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PageModel} from "../../../../models/page.model";
import {BrowserService} from "../../../../services/browser.service";

@Component({
  selector: 'app-browser-bottom-bar',
  standalone: true,
  imports: [],
  templateUrl: './browser-bottom-bar.component.html',
  styleUrl: './browser-bottom-bar.component.css'
})
export class BrowserBottomBarComponent implements AfterViewInit {
  @ViewChild('right_icon') icon: any;
  @Input() page!: PageModel;
  @Output() output_size = new EventEmitter<number[]>();
  private last_x?: number;
  private last_y?: number;

  constructor(
    private browser: BrowserService,
  ) {
  }

  ngAfterViewInit() {
    this.addEventListeners();
  }

  Resize(value: number[]) {
    this.output_size.emit(value);
  }

  addEventListeners() {
    let mouse_move_event = (e: any) => {
      const containerPos = document.getElementById('screen-container')!.getBoundingClientRect();
      const iconPos = this.icon.nativeElement.getBoundingClientRect();
      const y = e.clientY - containerPos.top, x= e.clientX - containerPos.left;

      let width = Math.min(Math.max(300, x - this.page.left!), containerPos.width - this.page.left!);
      let height = Math.min(Math.max(100, y - this.page.top!), containerPos.height - this.page.top!);
      this.Resize([width, height]);
      this.browser.Resize(this.page.id, width, height);
    }
    let mouse_up_event = (e: any) => {
      this.last_y = undefined;
      this.last_x = undefined;
      removeEventListener('mouseup', mouse_up_event);
      removeEventListener('mousemove', mouse_move_event);
    }
    let mouse_down_event = (e: any) => {
      addEventListener('mouseup', mouse_up_event);
      addEventListener('mousemove', mouse_move_event);
    }

    this.icon.nativeElement.addEventListener('mousedown', mouse_down_event);
  }
}
