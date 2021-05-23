import { Injectable } from '@angular/core';
import { GeneratorID } from './gen-id.generator';

@Injectable({
    providedIn: 'root'
})
export class GeneratorService {
    constructor(private generatorID: GeneratorID) {}

    generate(n: number): string {
        const result = [];
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < n; i++) {
            result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
        return result.join('');
    }

    genNewId(): number {
        return this.generatorID.genID();
    }
}
