import { Injectable } from '@angular/core';
import {ProductModel} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public products: ProductModel[] = [
    {src: 'assets/products/clown-balaklava.png', name:'clown balaclava', price: 0},
    {src: 'assets/products/clown-hoodie-b.png', name:'clown hoodie b', price: 0},
    {src: 'assets/products/clown-hoodie-w.png', name:'clown hoodie w', price: 0},
    {src: 'assets/products/clown-tshirt-b.png', name:'clown t-shirt b', price: 0},
    {src: 'assets/products/clown-tshirt-w.png', name:'clown t-shirt w', price: 0},
    {src: 'assets/products/gray-hat.png', name:'gray hat', price: 5000},
    {src: 'assets/products/locked-club-earring.png', name:'locked club earring', price: 0},
    {src: 'assets/products/love-pendant.png', name:'love pendant', price: 0},
  ];

  constructor() { }
}
