import { products } from '@/data/products';
import { CartItem } from './cart-item';
import { OrderSummary } from './order-summary';

export function CartPage() {
  return (
    <div className="mx-auto max-w-300">
      <h1 className="mb-8 text-2xl font-medium">Shopping Cart</h1>
      <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:items-start">
        <div className="grow space-y-4">
          {products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>
        <OrderSummary className="shrink-0 lg:w-90" />
      </div>
    </div>
  );
}
