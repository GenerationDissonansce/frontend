import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ServiceService } from "../../../../../services/service.service";
import { LocalstorageService } from "../../../../../services/localstorage.service";
import { PaymentService } from "../../../../../services/api/yookassa.service";
import { Location } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RightBarComponent } from "../../../../MOBILE/right-bar/right-bar.component";

@Component({
    selector: 'app-shop-basket-page',
    standalone: true,
    imports: [
        RouterLink,
        FormsModule,
    ],
    templateUrl: './shop-basket-page.component.html',
    styleUrl: './shop-basket-page.component.css'
})
export class ShopBasketPageComponent implements OnInit, AfterViewInit {
    public readonly sizes: string[] = ['S', 'M', 'L', 'XL'];
    counts: any[] = [];
    checkout: any;
    
    // deliveryCost: number | null = 600;
    // deliveryAddress: string = '';
    // deliveryFIO: string = '';
    // deliveryPhone: string = '';
    // deliveryEmail: string = '';
    
    constructor(
        private _location: Location,
        public service: ServiceService,
        public localstorage: LocalstorageService,
        @Inject(PaymentService) private paymentService: PaymentService
    ) {}
    
    ngOnInit() {
        for (let i = 0; i < this.service.products.length; i++) {
            let res: any = {};
            for (const size of this.sizes) {
                if (this.localstorage.get('item' + i + size) == '') this.localstorage.set('item' + i + size, '0');
                res[size] = Number(this.localstorage.get('item' + i + size));
            }
            this.counts.push(res);
        }
    }
    
    inputHandler(event: any, key: string) {
        localStorage.setItem(key, event.target.value);
    }
    
    ngAfterViewInit() {
        // @ts-ignore
        document.getElementById('delivery-fio')!.value = localStorage.getItem('delivery_fio')!;
        // @ts-ignore
        document.getElementById('delivery-email')!.value = localStorage.getItem('delivery_email')!;
        // @ts-ignore
        document.getElementById('delivery-phone')!.value = localStorage.getItem('delivery_phone')!;
        // @ts-ignore
        document.getElementById('delivery-comment')!.value = localStorage.getItem('delivery_comment')!;
        
        this.initMap();
    }
    
    async initMap() {
        // @ts-ignore
        window.widget = new window.CDEKWidget({
            apiKey: '34968cb7-371b-4d43-8f99-f3161156c5aa',
            root: 'cdek-map',
            servicePath: 'https://www.dissonanspokoleniy.com/service.php',
            defaultLocation: 'Moscow',
            from: 'Ulitsa Dmitriya Donskogo 11/1, Brest, Brest Region 224012, Belarus',
            goods: [
                { length: 40, width: 40, height: 3, weight: 400 },
            ],
            onChoose: function (_type: any, tariff: any, address: any) {
                console.log(_type, tariff, address);
                localStorage.setItem('delivery_type', (_type));
                localStorage.setItem('delivery_tariff', JSON.stringify(tariff));
                localStorage.setItem('delivery_address', JSON.stringify(address));
                
                document.getElementById('address-container')!.innerHTML = '<br>Заказ с доставкой в: ' + address.name + '<br>Локальный адрес доставки: ' + address.address + '<br>Примерные сроки доставки (дней): ' + tariff.period_max;
                
                this.close();
            },
        });
    }
    
    // validateFormData(): boolean {
    // if (this.deliveryCost === null) return true;
    // return false;
    // }
    
    remove(index: number, size: string) {
        this.counts[index][size]--;
        this.localstorage.set('item' + index + size, String(this.counts[index][size]));
    }
    
    backClicked() {
        this._location.back();
    }
    
    add(index: number, size: string) {
        this.counts[index][size]++;
        this.localstorage.set('item' + index + size, String(this.counts[index][size]));
    }
    
    getDeliveryPrice() {
        // this.paymentService.getDeliveryPrice(this.deliveryAddress)
        //     .then(resp => console.log(resp))
        //     .catch(error => console.log(error));
    }
    
    getFinalPrice() {
        let result = 0;
        for (let i = 0; i < this.service.products.length; i++)
            for (const size of this.sizes)
                result += this.counts[i][size] * this.service.products[i].price;
        return result;
    }
    
    open() {
        RightBarComponent.Open();
    }
}
