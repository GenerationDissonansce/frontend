import { Injectable } from '@angular/core';
import {ProductModel} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public products: ProductModel[] = [
    {src: 'assets/products/t-shirt-1.JPEG', name:'WHITE COIN TEE', price: 4490, images: ['assets/products/t-shirt-1.JPEG', 'assets/products/t-shirt-2.JPEG', 'assets/products/t-shirt-3.JPEG'], valid: true},
  ];

  constructor() {

  }
}
