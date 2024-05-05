import {Injectable} from '@angular/core';
import {ScreenIconModel} from "../models/screen-icon.model";
import {ScreenSizeService} from "./screen-size.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScreenIconsService {
  public observer = new Subject();
  public subscribers$ = this.observer.asObservable();
  public readonly screen_icons: ScreenIconModel[] = [
    {id: 0, name: 'assets/icons/texts/service.svg', url: 'assets/icons/service-icon.svg', x: 0, y: 0, is_chosen: false},
    {id: 1, name: 'assets/icons/texts/contact.svg', url: 'assets/icons/contact-icon.svg', x: 0, y: 0, is_chosen: false},
    {
      id: 2,
      name: 'assets/icons/texts/about-us.svg',
      url: 'assets/icons/about-us-icon.svg',
      x: 0,
      y: 0,
      is_chosen: false
    },
    {id: 3, name: 'assets/icons/texts/games.svg', url: 'assets/icons/games-icon.svg', x: 0, y: 0, is_chosen: false},
  ];

  constructor(
    private screen_size: ScreenSizeService,
  ) {
    for (let i = 0; i < this.screen_icons.length; i++)
      for (let j = 0; j < this.screen_icons.length; j++)
        if (i != j && this.screen_icons[i].x == this.screen_icons[j].x && this.screen_icons[i].y == this.screen_icons[j].y)
          this.moveOutOfCollide(j, this.screen_icons[j].x!, this.screen_icons[j].y!);
  }

  emitData() {
    this.observer.next({});
  }

  moveOutOfCollide(id: number, x: number, y: number) {
    var check = (x: number, y: number): boolean => {
      return !(x < 0 || y < 0 || y >= this.screen_size.height / this.screen_size.icon_size - 1 || x >= this.screen_size.width / this.screen_size.icon_size - 1);
    }
    var check_collide = (x: number, y: number): boolean => {
      for (let i = 0; i < this.screen_icons.length; i++)
        if (i != id && this.screen_icons[i].x == x && this.screen_icons[i].y == y)
          return false;
      return true;
    }

    let queue = [];
    queue.push([x, y]);
    const dx: number[] = [1, 0, -1, 0];
    const dy: number[] = [0, 1, 0, -1];
    while (queue.length > 0) {
      let pos: number[] = queue.shift()!;
      if (check(pos[0], pos[1]) && check_collide(pos[0], pos[1])) {
        this.screen_icons[id].x = pos[0];
        this.screen_icons[id].y = pos[1];
        this.emitData();
        queue = [];
        break;
      }
      for (let i = 0; i < 4; i++) {
        let tox = pos[0] + dx[i], toy = pos[1] + dy[i];
        if (check(tox, toy))
          queue.push([tox, toy]);
      }
    }

  }

  chooseIcon(id: number) {
    for (const screenIcon of this.screen_icons) screenIcon.is_chosen = false;
    this.screen_icons[id].is_chosen = true;
    this.emitData();
  }

  moveIcon(id: number, rect: any) {
    const max_x = Math.round(this.screen_size.width / this.screen_size.icon_size - 1);
    const max_y = Math.round(this.screen_size.height / this.screen_size.icon_size - 1);
    let get_cords = (): number[] => {
      let result: number[] = [0, 0];

      if (rect.left >= this.screen_size.width) result[0] = max_x - 1;
      else if (rect.right < 0) result[0] = 0;
      else {
        for (let i = 0; i <= max_x; i++) {
          let sz = this.screen_size.icon_size;
          let l = i * sz - sz / 2, r = (i + 1) * sz + sz / 2;
          if (l <= rect.left && rect.right <= r) {
            result[0] = i;
            break;
          }
        }
      }

      if (rect.top >= this.screen_size.height) result[1] = max_y - 1;
      else if (rect.bottom < 0) result[1] = 0;
      else {
        for (let i = 0; i <= max_y; i++) {
          let sz = this.screen_size.icon_size;
          let l = i * sz - sz / 2, r = (i + 1) * sz + sz / 2;
          if (l <= rect.top && rect.bottom <= r) {
            result[1] = i;
            break;
          }
        }
      }

      return result;
    }
    let [x, y] = get_cords();
    x = Math.max(0, Math.min(x, max_x));
    y = Math.max(0, Math.min(y, max_y));
    this.moveOutOfCollide(id, x, y);
  }
}
