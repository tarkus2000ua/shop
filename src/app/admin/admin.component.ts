import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  items: MenuItem[];
  constructor() { }

    ngOnInit(): void {
        this.items = [
            {label: 'Admin', routerLink: './'},
            {label: 'products', routerLink: './products'},
            {label: 'orders', routerLink: './orders'},
        ];
    }



}
