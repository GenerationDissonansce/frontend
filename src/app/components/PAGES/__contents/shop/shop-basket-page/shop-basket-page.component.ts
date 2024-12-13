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
    
    deliveryCost: number | null = 600;
    deliveryAddress: string = '';
    deliveryFIO: string = '';
    deliveryPhone: string = '';
    deliveryEmail: string = '';
    
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
    
    ngAfterViewInit() {
        // document.addEventListener('DOMContentLoaded', () => {
        //     // @ts-ignore
        //     new window.CDEKWidget({
        //         from: 'Новосибирск',
        //         root: 'cdek-map',
        //         apiKey: '34968cb7-371b-4d43-8f99-f3161156c5aa',
        //         servicePath: 'https://www.dissonanspokoleniy.com/service.php',
        //         defaultLocation: 'Новосибирск'
        //     })
        // });
    }
    
    validateFormData(): boolean {
        if (this.deliveryCost === null) return true;
        return false;
    }
    
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
        this.paymentService.getDeliveryPrice(this.deliveryAddress)
            .then(resp => console.log(resp))
            .catch(error => console.log(error));
    }
    
    getFinalPrice() {
        let result = 0;
        for (let i = 0; i < this.service.products.length; i++)
            for (const size of this.sizes)
                result += this.counts[i][size] * this.service.products[i].price;
        return result + this.deliveryCost!;
    }
    
    open() {
        RightBarComponent.Open();
    }
}
