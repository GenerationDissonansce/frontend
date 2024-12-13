import { Component } from '@angular/core';
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
    currentDate: string = '';
    
    constructor() {
        this.setCurrentDate();
    }
    
    setCurrentDate() {
        const date = new Date();
        this.currentDate = `${String(date.getDay()).padStart(2,'0')}/${String(date.getMonth()).padStart(2,'0')}/${date.getFullYear()} ${String(date.getHours()%12).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}${date.getHours()>12?'pm':'am'} MSK`
        
        setTimeout(() => this.setCurrentDate(), 1000);
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
