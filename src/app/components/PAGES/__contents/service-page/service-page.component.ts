import {Component, Input, ViewChildren} from '@angular/core';
import {PageModel} from "../../../../models/page.model";
import { RouterLink } from "@angular/router";
import { RightBarComponent } from "../../../MOBILE/right-bar/right-bar.component";

@Component({
  selector: 'app-service-page',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.css'
})
export class ServicePageComponent {
  @Input() page!: PageModel;
  texts: string[][] = [
    [
      '-Есть ли у Вас шоурум?',
      '-Пока нет, наши футболки висят в шоуруме Steven Rhodes по адресу Большой Трёхсвятительский переулок 2/1с5, Москва.',
      '-Как происходит доставка?',
      '-Доставляем по России CDEK’ом. Обычно это занимает 3-4 дней.',
      '-Как я узнаю, где моя посылка?',
      '-На почту будет выслано письмо с трек-номером для отслеживания.',
      '-Сколько стоит доставка?',
      '-600 рублей.',
      '-Как я могу задать свои вопросы и уточнить информацию?',
      '-Наша почта: dissonans.pokoleniy@gmail.com\n' +
      '  Instagram: @dissonans_pokoleniy',
      '-Как можно оплатить доставку?',
      '-Оплата возможна картой или через СБП.',
      '-Я могу вернуть товар?',
      '-Да, только если вещь находится в надлежащем качестве. Возврат возможен в течение двух недель.',
    ],
    [
      '-Do you have a showroom?',
      '-Not yet, our T-shirts are hanging in the Steven Rhodes showroom at Bolshoy Trekhsvyatitelsky Lane 2/1с5, Moscow.',
      '-How does delivery work?',
      '-We deliver throughout Russia using CDEK. Usually it takes 3-4 days.',
      '-How do I find out where my parcel is?',
      '-A letter will be sent by mail with a tracking number for identification.',
      '-How much does delivery cost?',
      '-600 rubles.',
      '-How can I ask my questions and clarify information?',
      '-Our mail: dissonans.pokoleniy@gmail.com\n' +
      '  Instagram: @dissonans_pokoleniy',
      '-How can I pay for delivery?',
      '-Payment possible by card or via SBP.',
      '-Can I return the goods?',
      '-Yes, only if the item is in proper quality. Returns are possible within two weeks.',
    ],
  ]
  index: number = 0;
  
  open() {
    RightBarComponent.Open();
  }
}
