import { InjectionToken } from '@angular/core';
import { GeneratorService } from './generator';

export const generatedString = new InjectionToken<number[]>('generatedString');

export function GeneratorFactory(take: number): (data: GeneratorService) => string {
    return (data: GeneratorService) => data.generate(take);
}
