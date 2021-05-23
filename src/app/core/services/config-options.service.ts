import { Injectable } from '@angular/core';

import { ConfigModel } from '../models/config.model';

@Injectable({
    providedIn: 'root'
})
export class ConfigOptionsService {
    private config: ConfigModel;

    constructor() {}

    setConfig(fieldsToUpdate: Partial<ConfigModel>): void {
        this.config = { ...this.config, ...fieldsToUpdate };
    }

    getConfig(): ConfigModel {
        return this.config;
    }
}
