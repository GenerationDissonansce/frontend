import { Injectable } from '@angular/core';
import {ProductModel} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public products: ProductModel[] = [
    {src: 'assets/products/t-shirt-1.jpg', name:'WHITE COIN TEE', price: 6000, images: ['assets/products/t-shirt-1.jpg', 'assets/products/t-shirt-2.jpg', 'assets/products/t-shirt-3.jpg']},
  ];

  constructor() {

  }
}
