import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tr[app-cart-item]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent implements OnInit {
  @Input() itemName: string;
  @Input() count: number;
  @Input() index: number;
  @Output() countChange = new EventEmitter<number>();
  @Output() delete = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  increment(): void{
    this.countChange.emit(this.count + 1);
  }

  decrement(): void{
    if (this.count > 0){
      this.countChange.emit(this.count - 1);
    }
  }

  deleteItem(): void{
    this.delete.emit();
  }

}
