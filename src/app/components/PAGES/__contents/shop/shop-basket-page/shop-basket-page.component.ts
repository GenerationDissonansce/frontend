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
  checkout: any;

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

  async request() {
    document.getElementById('payment-form')!.innerHTML = '';
    let response = fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Idempotence-Key': 'Idempotence-Key: 12312',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('latin:')
      },
      body: JSON.stringify({
        'amount': {
          'value': `${this.getFinalPrice()}.00`,
          'currency': 'RUB'
        },
        'confirmation': {
          'type': 'embedded'
        },
        'capture': true,
        'description': ''
      })
    }).then(
      resp => {
        console.log(resp);
        // @ts-ignore
        this.checkout = new window.YooMoneyCheckoutWidget({
          confirmation_token: 'ct-287e0c37-000f-5000-8000-16961d35b0fd', //Токен, который перед проведением оплаты нужно получить от ЮKassa
          return_url: 'http://localhost:4200', //Ссылка на страницу завершения оплаты, это может быть любая ваша страница
          error_callback: function(error: any) {
            console.log(error)
          }
        });
        this.checkout.render('payment-form');
      },
      error => {
        // @ts-ignore
        this.checkout = new window.YooMoneyCheckoutWidget({
          confirmation_token: 'ct-287e0c37-000f-5000-8000-16961d35b0fd', //Токен, который перед проведением оплаты нужно получить от ЮKassa
          return_url: 'http://localhost:4200', //Ссылка на страницу завершения оплаты, это может быть любая ваша страница
          error_callback: function(error: any) {
            console.log(error)
          }
        });
        this.checkout.render('payment-form');
      }
    )
  }

  getFinalPrice() {
    let result = 0;
    for (let i = 0; i < this.service.products.length; i++)
      result += this.counts[i]*this.service.products[i].price;
    return result;
  }
}
