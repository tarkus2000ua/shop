import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {MenuItem, PrimeNGConfig} from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('appTitle') title: ElementRef<HTMLHeadingElement>;

    items: MenuItem[];

    constructor(private primengConfig: PrimeNGConfig ){}

    ngOnInit(){
        this.primengConfig.ripple = true;
        this.items = [
            {
                label:'Home',
                icon:'pi pi-home',
            },
            {
                label:'Cart',
                icon:'pi pi-shopping-cart',
            }
        ];
    }

    ngAfterViewInit(): void {
        this.title.nativeElement.innerText = 'My Shop';
    }
}
