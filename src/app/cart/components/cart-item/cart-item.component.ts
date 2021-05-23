import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'tr[app-cart-item]',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
    @Input() itemName: string;
    @Input() itemPrice: number;
    @Input() count: number;
    @Input() index: number;
    @Output() increase = new EventEmitter<number>();
    @Output() decrease = new EventEmitter<number>();
    @Output() delete = new EventEmitter<void>();

    constructor() {}

    onIncrease(): void {
        this.increase.emit(1);
    }

    onDecrease(): void {
        if (this.count > 0) {
            this.decrease.emit(1);
        }
    }

    deleteItem(): void {
        this.delete.emit();
    }
}
