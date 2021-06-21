import { Injectable } from '@angular/core';

interface StorageService {
    getValue: (key: string) => string;
    setValue: (key: string, value: string) => void;
}

export const LocalStorage = {
    getValue: (key: string) => window.localStorage.getItem(key),
    setValue: (key: string, value: string) => window.localStorage.setItem(key, value)
};
@Injectable({
    providedIn: 'root'
})
export class LocalStorageService{
    getValue(key: string): string {
        return window.localStorage.getItem(key);
    }

    setValue(key: string, value: string): void {
        window.localStorage.setItem(key, value);
    }
}
