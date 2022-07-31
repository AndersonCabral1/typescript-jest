import { OrderStatus } from './interfaces/order-status';
import { CustomerOrder } from './interfaces/customer-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { MessagingProtocol } from './interfaces/messaging-protocol';
import { PersistencyProtocol } from './interfaces/persistency-protocol';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  /**é preciso injetar uma dependência (shopping cart)
   * para usar as funções no checkout
   */
  constructor(
    /**injeções de dependências */
    private readonly cart: ShoppingCartProtocol, //interface
    private readonly messaging: MessagingProtocol, //interface
    private readonly persistency: PersistencyProtocol, //interface
    private readonly customer: CustomerOrder, //interface
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('Seu carrinho está vazio!');
      return;
    }

    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `O seu pedido, com total de ${this.cart.totalWidthDiscount()}, foi recebido`,
    );
    this.persistency.saveOrder();
    this.cart.clear();
    console.log(
      'O cliente é ' +
        this.customer.getName() +
        ' com identificação fiscal: ' +
        this.customer.getIDN(),
    );
  }
}
