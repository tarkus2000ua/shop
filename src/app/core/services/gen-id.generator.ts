import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GeneratorID {
    constructor() {}

    lastID = 0;

    genID(): number {
        return ++this.lastID;
    }
}
