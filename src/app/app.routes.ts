import { Routes } from '@angular/router';
import {ClothesPageComponent} from "./components/PAGES/__contents/shop/clothes-page/clothes-page.component";
import {ShopBasketPageComponent} from "./components/PAGES/__contents/shop/shop-basket-page/shop-basket-page.component";
import {ShopItemPageComponent} from "./components/PAGES/__contents/shop/shop-item-page/shop-item-page.component";
import {AboutUsPageComponent} from "./components/PAGES/__contents/about-us-page/about-us-page.component";
import {ServicePageComponent} from "./components/PAGES/__contents/service-page/service-page.component";
import {ContactPageComponent} from "./components/PAGES/__contents/contact-page/contact-page.component";
import {IsMobileGuard} from "./guards/is-mobile.guard";

export const routes: Routes = [
  {path: '', component: ClothesPageComponent, pathMatch: 'full'},
  {path: 'basket', component: ShopBasketPageComponent},
  {path: 'item/:id', component: ShopItemPageComponent},
  {path: 'about-us', component: AboutUsPageComponent, canActivate: [IsMobileGuard]},
  {path: 'service', component: ServicePageComponent, canActivate: [IsMobileGuard]},
  {path: 'contact', component: ContactPageComponent, canActivate: [IsMobileGuard]},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];
