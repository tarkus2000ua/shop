import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MenuItem, PrimeNGConfig} from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild('appTitle') title: ElementRef<HTMLHeadingElement>;

    items: MenuItem[];

    constructor(private primengConfig: PrimeNGConfig ){}

    ngOnInit(): void{
        this.primengConfig.ripple = true;
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: ['']
            },
            {
                label: 'Cart',
                icon: 'pi pi-shopping-cart',
                routerLink: ['cart']
            },
            {
                label: 'Admin',
                routerLink: ['admin']
            }
        ];
    }

    ngAfterViewInit(): void {
        this.title.nativeElement.innerText = 'My Shop';
    }
}
