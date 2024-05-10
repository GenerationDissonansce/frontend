import {AfterViewInit, Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements AfterViewInit {
  @ViewChild('clock') clock: any;

  ngAfterViewInit() {
    this.ShowTime();
  }

  async ShowTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var session = "AM";

    if (h === 0) h = 12;
    if (h > 12) {
      h -= 12;
      session = 'PM';
    }

    let hs: string = (h < 10) ? "0" + String(h) : String(h);
    let ms: string = (m < 10) ? "0" + String(m) : String(m);

    this.clock.nativeElement.innerText = `${hs}:${ms} ${session}`;

    setTimeout(()=>{
      this.ShowTime()
    }, 1000);
  }
}
