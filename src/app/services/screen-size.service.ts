import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  public height: number = 0;
  public width: number = 0;
  public icon_size: number = 65;

  constructor() {
    this.height = Math.min(768, Math.max(480, window.innerHeight - 168));
    this.width = Math.min(1024, Math.max(640, window.innerWidth - 168));

    if (this.width * 3 < this.height * 4) this.height = this.width / 4 * 3;
    else this.width = this.height / 3 * 4;

    this.icon_size = Math.min(65, 65 * this.height / 500);
  }
}
