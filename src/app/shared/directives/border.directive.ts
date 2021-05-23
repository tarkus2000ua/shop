import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appBorder]'
})
export class BorderDirective {
    @Input('appBorder') color: string;

    constructor(private el: ElementRef, private render: Renderer2) {}

    @HostListener('click')
    onClick(): void {
        this.addBorder(this.color || this.getRandomColor());
    }

    addBorder(color: string): void {
        this.render.setStyle(this.el.nativeElement, 'border', `5px solid ${color}`);
    }

    getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
