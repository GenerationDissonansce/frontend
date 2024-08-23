import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ServiceService } from "../../../../../services/service.service";
import { LocalstorageService } from "../../../../../services/localstorage.service";
import { PaymentService } from "../../../../../services/api/yookassa.service";

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
  public readonly sizes: string[] = ['S', 'M', 'L', 'XL'];
  counts: any[] = [
  ];
  checkout: any;

  constructor(
    public service: ServiceService,
    public localstorage: LocalstorageService,
    @Inject(PaymentService) private paymentService: PaymentService
  ) {
  }

  ngOnInit() {
    for (let i = 0; i < this.service.products.length; i++) {
      let res: any = {};
      for (const size of this.sizes) {
        if (this.localstorage.get('item' + i + size) == '') this.localstorage.set('item' + i + size, '0');
        res[size] = Number(this.localstorage.get('item' + i + size));
      }
      this.counts.push(res);
    }
  }

  remove(index: number, size: string) {
    this.counts[index][size]--;
    this.localstorage.set('item' + index + size, String(this.counts[index][size]));
  }

  add(index: number, size: string) {
    this.counts[index][size]++;
    this.localstorage.set('item' + index, String(this.counts[index][size]));
  }

  makePayment() {
    const amount = `${ this.getFinalPrice() }.00`;
    const currency = 'RUB';
    const returnUrl = 'https://dissonanspokoleniy.com/';
    const description = 'Заказ №1';

    // this.paymentService.createPayment(amount, currency, returnUrl, description).subscribe(
    //   (response: any) => {
    //     console.log('Payment initiated:', response);
    //     // Redirect the user to the confirmation URL
    //     window.location.href = response.confirmation.confirmation_url;
    //   },
    //   (error: any) => {
    //     console.error('Payment error:', error);
    //   }
    // );

    this.paymentService.func();
  }

  LOL() {
    // @ts-ignore
    this.checkout = new window.YooMoneyCheckoutWidget({
      confirmation_token: 'ct-287e0c37-000f-5000-8000-16961d35b0fd', //Токен, который перед проведением оплаты нужно получить от ЮKassa
      return_url: 'http://localhost:4200', //Ссылка на страницу завершения оплаты, это может быть любая ваша страница
      error_callback: function (error: any) {
        console.log(error)
      }
    });
  }

  getFinalPrice() {
    let result = 0;
    for (let i = 0; i < this.service.products.length; i++)
      for (const size of this.sizes)
        result += this.counts[i][size] * this.service.products[i].price;
    return result;
  }
}
