import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {UpdatePageService} from "../../../../services/update-page.service";
import {PageModel} from "../../../../models/page.model";

@Component({
  selector: 'app-browser-scrollbar',
  standalone: true,
  imports: [],
  templateUrl: './browser-scrollbar.component.html',
  styleUrl: './browser-scrollbar.component.css'
})
export class BrowserScrollbarComponent implements AfterViewInit {
  @ViewChild('container') container: any;
  @ViewChild('icon') icon: any;
  @Input() page!: PageModel;
  private minusy = 0;

  ScrollingDown: boolean = false;
  ScrollingUp: boolean = false;

  constructor(
    private updatePageService: UpdatePageService,
  ) {
    this.updatePageService.scrollbar_subscribers$.subscribe((e:any) => {
      if (e.pageId == this.page.id) {
        const percent = e.percent;
        const height = this.container.nativeElement.getBoundingClientRect().height - this.icon.nativeElement.getBoundingClientRect().height;
        const top = height * percent;
        this.icon.nativeElement.style.top = `${top}px`;
      }
    })
  }

  ngAfterViewInit() {
    this.addListeners();
  }

  addListeners() {
    let mouse_move = (e:any) => {
      const screenPos = this.container.nativeElement.getBoundingClientRect();
      const y = e.clientY - screenPos.top - this.minusy;
      const height = this.container.nativeElement.getBoundingClientRect().height - this.icon.nativeElement.getBoundingClientRect().height;
      const top = Math.max(0, Math.min(y, height));
      const percent = Math.min(1, top / height);
      this.icon.nativeElement.style.top = `${top}px`;
      this.updatePageService.ScrollEmitData(percent, this.page.id);
    }
    let mouse_up = () => {
      removeEventListener('mouseup', mouse_up);
      removeEventListener('mousemove', mouse_move);
    }
    let mouse_down = (e: any) => {
      const pos = this.icon.nativeElement.getBoundingClientRect();
      this.minusy = e.clientY - pos.top;
      addEventListener('mouseup', mouse_up);
      addEventListener('mousemove', mouse_move);
    }

    this.icon.nativeElement.addEventListener('mousedown', mouse_down);
  }

  StartScrollDown() {
    this.ScrollingDown = true;
    this.ScrollDown();
    addEventListener('mouseup', () => { this.ScrollingDown = false; });
  }

  ScrollDown() {
    if (!this.ScrollingDown) return;
    const containerPos = this.container.nativeElement.getBoundingClientRect();
    const iconPos = this.icon.nativeElement.getBoundingClientRect();
    console.log(iconPos.top, containerPos.top);
    let percent = (iconPos.top - containerPos.top - 1) / (containerPos.height - iconPos.height);

    percent = Math.min(percent + 0.01, 1);
    this.updatePageService.ScrollEmitData(percent, this.page.id);
    this.updatePageService.ScrollBarEmitData(percent, this.page.id);

    setTimeout(() => { this.ScrollDown(); }, 10);
  }

  StartScrollingUp() {
    this.ScrollingUp = true;
    this.ScrollUp();
    addEventListener('mouseup', () => { this.ScrollingUp = false; });
  }

  ScrollUp() {
    if (!this.ScrollingUp) return;
    const containerPos = this.container.nativeElement.getBoundingClientRect();
    const iconPos = this.icon.nativeElement.getBoundingClientRect();
    let percent = (iconPos.top - containerPos.top - 1) / (containerPos.height - iconPos.height);

    percent = Math.max(percent-0.01, 0);
    console.log(percent);
    this.updatePageService.ScrollEmitData(percent, this.page.id);
    this.updatePageService.ScrollBarEmitData(percent, this.page.id);

    setTimeout(() => { this.ScrollUp(); }, 10);
  }
}
