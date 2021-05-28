import { InjectionToken } from '@angular/core';

export interface StorageService {
    getValue: (key: string) => string;
    setValue: (key: string, value: string) => void;
}

export const LocalStorage = {
    getValue: (key: string) => window.localStorage.getItem(key),
    setValue: (key: string, value: string) => window.localStorage.setItem(key, value)
};

export const LocalStorageService = new InjectionToken<StorageService>('Local storage service');
