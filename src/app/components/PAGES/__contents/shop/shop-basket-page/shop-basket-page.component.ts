import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {ServiceService} from "../../../../../services/service.service";
import {LocalstorageService} from "../../../../../services/localstorage.service";

@Component({
  selector: 'app-shop-basket-page',
  standalone: true,
        imports: [
                RouterLink
        ],
  templateUrl: './shop-basket-page.component.html',
  styleUrl: './shop-basket-page.component.css'
})
export class ShopBasketPageComponent implements OnInit {
  counts: number[] = [];

  constructor(
    public service: ServiceService,
    public localstorage: LocalstorageService,
  ) {
  }

  ngOnInit() {
    for (let i = 0; i < this.service.products.length; i++) {
      if (this.localstorage.get('item'+i) == '') this.localstorage.set('item'+i, '0');
      this.counts.push(Number(this.localstorage.get('item'+i)));
    }
  }

  remove(index: number) {
    this.counts[index]--;
    this.localstorage.set('item'+index, String(this.counts[index]));
  }

  add(index: number) {
    this.counts[index]++;
    this.localstorage.set('item'+index, String(this.counts[index]));
  }

  request() {

  }

  getFinalPrice() {
    let result = 0;
    for (let i = 0; i < this.service.products.length; i++)
      result += this.counts[i]*this.service.products[i].price;
    return result;
  }
}
