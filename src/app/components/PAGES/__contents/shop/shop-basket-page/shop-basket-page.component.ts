import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {ServiceService} from "../../../../../services/service.service";
import {LocalstorageService} from "../../../../../services/localstorage.service";
import {PaymentService} from "../../../../../services/api/yookassa.service";
import {getLocaleDateFormat} from "@angular/common";

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
  checkout: any;

  constructor(
    public service: ServiceService,
    public localstorage: LocalstorageService,
    private paymentService: PaymentService
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

  makePayment() {
    const amount = `${this.getFinalPrice()}.00`;
    const currency = 'RUB';
    const returnUrl = 'https://dissonanspokoleniy.com/';
    const description = 'Заказ №1';

    this.paymentService.createPayment(amount, currency, returnUrl, description).subscribe(
      (response: any) => {
        console.log('Payment initiated:', response);
        // Redirect the user to the confirmation URL
        window.location.href = response.confirmation.confirmation_url;
      },
      (error: any) => {
        console.error('Payment error:', error);
      }
    );
  }

  LOL() {
    // @ts-ignore
    this.checkout = new window.YooMoneyCheckoutWidget({
      confirmation_token: 'ct-287e0c37-000f-5000-8000-16961d35b0fd', //Токен, который перед проведением оплаты нужно получить от ЮKassa
      return_url: 'http://localhost:4200', //Ссылка на страницу завершения оплаты, это может быть любая ваша страница
      error_callback: function(error: any) {
        console.log(error)
      }
    });
  }

  getFinalPrice() {
    let result = 0;
    for (let i = 0; i < this.service.products.length; i++)
      result += this.counts[i]*this.service.products[i].price;
    return result;
  }

    protected readonly getLocaleDateFormat = getLocaleDateFormat;
}
