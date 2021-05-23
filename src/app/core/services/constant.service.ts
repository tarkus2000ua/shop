import { InjectionToken } from '@angular/core';

export interface AppInfo {
    name: string;
    ver: string;
    url: string;
}

export const APP_INFO: AppInfo = {
    name: 'My Shop',
    ver: '1.0',
    url: 'http://myshop.com'
};

export const ConstantsService = new InjectionToken<AppInfo>('Constant service');
