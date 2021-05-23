import { LocalStorage, LocalStorageService } from './../core/services/local-storage.service';
import { GeneratorService } from '../core/services/generator';
import { generatedString, GeneratorFactory } from './../core/services/generator.factory';
import { ConfigOptionsService } from './../core/services/config-options.service';
import { Component, Inject, OnInit, Optional } from '@angular/core';

import { Category } from '../models/product.model';
import { APP_INFO, ConstantsService } from '../core/services/constant.service';

const CATEGORY_NAMES = ['Desktops', 'Laptops', 'Tablets'];

@Component({
    selector: 'app-first',
    templateUrl: './first.component.html',
    styleUrls: ['./first.component.scss'],
    providers: [
        ConfigOptionsService,
        GeneratorService,
        { provide: ConstantsService, useValue: APP_INFO },
        { provide: generatedString, useFactory: GeneratorFactory(10), deps: [GeneratorService] },
        { provide: LocalStorageService, useValue: LocalStorage }
    ]
})
export class FirstComponent implements OnInit {
    name = 'IPad';
    description = '8th generation of Apple\'s IPad';
    price = 350;
    category = Category.Tablets;
    isAvailable = true;

    constructor(
        @Optional() private configService: ConfigOptionsService,
        @Optional() private generatorService: GeneratorService,
        @Optional() @Inject(ConstantsService) private constantsService,
        @Optional() @Inject(generatedString) private genString,
        @Optional() @Inject(LocalStorageService) private localStorageService
    ) {}

    ngOnInit(): void {
        this.configService.setConfig({ id: 1, login: 'Angular30' });
        console.log(this.configService.getConfig());
        console.log(this.constantsService);

        console.log(`${this.genString}__${this.generatorService.genNewId()}`);
        console.log(`${this.genString}__${this.generatorService.genNewId()}`);
        console.log(`${this.genString}__${this.generatorService.genNewId()}`);

        this.localStorageService.setValue('myKey1', 'my value 1');
        console.log(this.localStorageService.getValue('myKey1'));
    }

    getCategoryName(id: number): string {
        return CATEGORY_NAMES[id];
    }
}
