import {Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ServiceService} from "../../../../../services/service.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProductModel} from "../../../../../models/product.model";
import {LocalstorageService} from "../../../../../services/localstorage.service";

@Component({
  selector: 'app-shop-item-page',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './shop-item-page.component.html',
  styleUrl: './shop-item-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopItemPageComponent implements OnInit {
  product!: ProductModel;
  count: number = 0;
  key!: string;
  src: string = '';
  src_index: number = 0;

  constructor(
    public localstorage: LocalstorageService,
    public service: ServiceService,
    public route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getProduct();
    this.src = this.product.images[this.src_index];
    console.log(this.product);
  }

  chooseSrc(index: number) {
    this.src_index = index;
    this.src = this.product.images[this.src_index];
  }

  minusSrcIndex() {
    this.src_index = Math.max(0, this.src_index-1);
    this.src = this.product.images[this.src_index];
  }

  plusSrcIndex() {
    this.src_index = Math.min(this.product.images.length-1, this.src_index+1);
    this.src = this.product.images[this.src_index];
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
