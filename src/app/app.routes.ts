import { Routes } from '@angular/router';
import {ClothesPageComponent} from "./components/PAGES/__contents/shop/clothes-page/clothes-page.component";
import {ShopBasketPageComponent} from "./components/PAGES/__contents/shop/shop-basket-page/shop-basket-page.component";
import {ShopItemPageComponent} from "./components/PAGES/__contents/shop/shop-item-page/shop-item-page.component";

export const routes: Routes = [
  {path: '', component: ClothesPageComponent},
  {path: 'basket', component: ShopBasketPageComponent},
  {path: 'item/:id', component: ShopItemPageComponent},
];
