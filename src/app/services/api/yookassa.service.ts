import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = environment.apiUrl;
  private shopId = environment.shopId;
  private secretKey = environment.secret_key;

  constructor(private http: HttpClient) { }

  createPayment(amount: string, currency: string, returnUrl: string, description: string): Observable<any> {
    const idempotenceKey = uuidv4();
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.shopId}:${this.secretKey}`),
      'Idempotence-Key': idempotenceKey,
      'Content-Type': 'application/json'
    });

    const body = {
      amount: {
        value: amount,
        currency: currency
      },
      capture: true,
      confirmation: {
        type: 'redirect',
        return_url: returnUrl
      },
      description: description
    };

    return this.http.post(this.apiUrl, body, { headers });
  }

  func() {
    fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Idempotence-Key': 'fdmsklfdsmlkfldsmflksdmkflds',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${this.shopId}:${this.secretKey}`)
      },
      // body: '{\n        "amount": {\n          "value": "100.00",\n          "currency": "RUB"\n        },\n        "capture": true,\n        "confirmation": {\n          "type": "redirect",\n          "return_url": "https://www.example.com/return_url"\n        },\n        "description": "Заказ №1"\n      }',
      body: JSON.stringify({
        'amount': {
          'value': '100.00',
          'currency': 'RUB'
        },
        'capture': true,
        'confirmation': {
          'type': 'redirect',
          'return_url': 'https://www.example.com/return_url'
        },
        'description': '\u0417\u0430\u043A\u0430\u0437 \u21161'
      })
    })
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
  }
}
