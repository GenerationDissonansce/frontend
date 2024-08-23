import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ServiceService } from "../../../../../services/service.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ProductModel } from "../../../../../models/product.model";
import { LocalstorageService } from "../../../../../services/localstorage.service";

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
  count: any = {
    'S': 0,
    "M": 0,
    "L": 0,
    "XL": 0,
  }
  key!: string;
  src: string = '';
  src_index: number = 0;
  public chosen_type: string = 'S';
  private readonly sizes: string[] = ['S', 'M', 'L', 'XL'];

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

  chooseType(_type: string) {
    this.chosen_type = _type;
    console.log(this.chosen_type);
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.service.products[id];
    this.key = 'item' + id;

    for (const size of this.sizes) {
      if (this.localstorage.get(this.key + size) == '')
        this.localstorage.set(this.key + size, '0');
      this.count[size] = Number(this.localstorage.get(this.key+size));
    }
  }

  remove() {
    this.count[this.chosen_type]--;
    this.localstorage.set(this.key + this.chosen_type, String(this.count[this.chosen_type]));
  }

  add() {
    this.count[this.chosen_type]++;
    this.localstorage.set(this.key + this.chosen_type, String(this.count[this.chosen_type]));
  }
}
