import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-right-bar',
    standalone: true,
    imports: [
        RouterLink
    ],
    templateUrl: './right-bar.component.html',
    styleUrl: './right-bar.component.css'
})
export class RightBarComponent {
    static is_opened: boolean = true;
    currentDate = signal<string>('');
    
    constructor() {
        this.setCurrentDate();
    }
    
    setCurrentDate() {
        const date = new Date();
        
        const date_string = `${ String(date.getDate()).padStart(2, '0') }/${ String(date.getMonth() + 1).padStart(2, '0') }/${ date.getFullYear() } ${ String((date.getUTCHours() + 3) % 12).padStart(2, '0') }:${ String(date.getMinutes()).padStart(2, '0') }${ date.getHours() > 12 ? 'pm' : 'am' } MSK`;
        
        this.currentDate.set(date_string);
        
        setTimeout(() => this.setCurrentDate(), 60*1000);
    }
    
    static Open() {
        RightBarComponent.is_opened = true;
        const container = document.getElementById('right-bar-container')!;
        const content = document.getElementById('right-bar-content')!;
        
        container.style.display = 'flex';
        setTimeout(() => {
            content.style.right = '0';
        });
    }
    
    static Close() {
        RightBarComponent.is_opened = false;
        const container = document.getElementById('right-bar-container')!;
        const content = document.getElementById('right-bar-content')!;
        
        content.style.right = '-100%';
        setTimeout(() => {
            container.style.display = 'none';
        }, 300);
    }
    
    static Interact() {
        if (RightBarComponent.is_opened) RightBarComponent.Close();
        else RightBarComponent.Open()
    }
    
    interact() {
        RightBarComponent.Interact();
    }
}
