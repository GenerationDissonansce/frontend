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

  getDeliveryPrice(address: string) {
    return fetch(environment.cdekApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'type': 1,
        'from_location': {
          'address': 'Ulitsa Dmitriya Donskogo 11/1, Brest, Brest Region 224012, Belarus'
        },
        'to_location': {
          'address': address
        },
        'packages': [{ 'weight': 100 }]
      })
    })
  }
}
