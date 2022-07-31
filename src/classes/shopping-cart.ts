import { Discount } from './discount'; //classe abstrata
import { CartItem } from './interfaces/cart-item';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';

export class ShoppingCart implements ShoppingCartProtocol {
  private readonly _items: CartItem[] = [];

  /**injetar dependência */
  constructor(private readonly discount: Discount) {}

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  //
  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  total(): number {
    //usar o '+' para converter para number( toFixed retorna uma string...)
    return +this._items.reduce((soma, item) => soma + item.price, 0).toFixed(2);
  }

  totalWidthDiscount(): number {
    return this.discount.calculate(this.total());
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  clear(): void {
    console.log('Carrinho de compras limpo.');
    this._items.length = 0;
  }
}
