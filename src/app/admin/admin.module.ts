import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TabMenuModule } from 'primeng/tabmenu';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';


import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: AdminRoutingModule.components,
  imports: [
    TabMenuModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    // BrowserAnimationsModule,
    AdminRoutingModule,
  ]
})
export class AdminModule {}
