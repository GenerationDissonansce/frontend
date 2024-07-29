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
  private shopId = '429056';
  private secretKey = 'test_CAhq0Atc4ghfnAaRfLBqs3qUkt61GCMCt4BgjODZXw4';

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
}
