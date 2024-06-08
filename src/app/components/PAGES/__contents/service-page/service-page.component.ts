import {Component, Input, ViewChildren} from '@angular/core';
import {PageModel} from "../../../../models/page.model";

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.css'
})
export class ServicePageComponent {
  @ViewChildren('card') cards: any;
  @ViewChildren('icon') icons: any;
  @Input() page!: PageModel;
  texts: string[][] = [
    [
      '-Как происходит доставка?',
      '-Доставляем по России CDEK’ом. Обычно это занимает 5-6 дней.',
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
      '-Да, только если вещь не вскрыта. Возврат возможен в течение недели.',
    ],
    [
      '-How does delivery work?',
      '-We deliver throughout Russia using CDEK. Usually it takes 5-6 days.',
      '-How do I find out where my parcel is?',
      '-A letter will be sent by mail with a tracking number for identification.',
      '-How much does delivery cost?',
      '-600 rubles.',
      '-How can I ask my questions and clarify information?',
      '-Our mail: dissonans.pokoleniy@gmail.com\n' +
      '  Instagram: @dissonans_pokoleniy',
      '-How can I pay for delivery?',
      '-Payment by possible card or via SBP.',
      '-Can I return the goods?',
      '-Yes, only if the item is not opened. Returns are possible within a week.',
    ],
  ]
  index: number = 0;
  opened: boolean[] = [true, false, false, false, false, false];

  interact(index: number) {
    if (this.opened[index]) {
      this.opened[index] = false;
      this.icons._results[index].nativeElement.style.transform = 'rotate(0)';
    } else {
      for (let i = 0; i < this.icons._results.length; i++) if (i != index) this.icons._results[i].nativeElement.style.transform = 'rotate(0)';
      this.icons._results[index].nativeElement.style.transform = 'rotate(90deg)';
      for (let i = 0; i < this.opened.length; i++) this.opened[i] = false;
      this.opened[index] = true;
    }
  }
}
