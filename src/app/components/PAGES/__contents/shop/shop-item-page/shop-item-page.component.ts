import {Component, OnInit} from '@angular/core';
import {ServiceService} from "../../../../../services/service.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProductModel} from "../../../../../models/product.model";
import {LocalstorageService} from "../../../../../services/localstorage.service";

@Component({
  selector: 'app-shop-item-page',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './shop-item-page.component.html',
  styleUrl: './shop-item-page.component.css'
})
export class ShopItemPageComponent implements OnInit {
  product!: ProductModel;
  count: number = 0;
  key!: string;

  constructor(
    public localstorage: LocalstorageService,
    public service: ServiceService,
    public route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.service.products[id];
    this.key = 'item'+id;

    if (this.localstorage.get(this.key) == '')
      this.localstorage.set(this.key, '0');
    this.count = Number(this.localstorage.get(this.key));
  }

  remove() {
    this.count--;
    this.localstorage.set(this.key, String(this.count));
  }

  add() {
    this.count++;
    this.localstorage.set(this.key, String(this.count));
  }
}
