import { products } from '@/data/products';
import { Button } from '@/shared/components/ui/button';
import { useCart } from '@/shared/hooks/use-cart';
import { usePageType } from '@/shared/hooks/use-page-type';
import { filterCartProducts } from '../utils/filter';
import { CartItem } from './cart-item';
import { OrderSummary } from './order-summary';

export function CartPage() {
  const { cart } = useCart();
  const cartProducts = filterCartProducts(cart, products);

  return (
    <div className="mx-auto max-w-300">
      <h1 className="mb-8 text-2xl font-medium">Shopping Cart</h1>
      {cartProducts.length ? (
        <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:items-start">
          <div className="grow space-y-4">
            {cartProducts.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>
          <OrderSummary className="shrink-0 lg:w-90" products={cartProducts} />
        </div>
      ) : (
        <CartEmpty />
      )}
    </div>
  );
}

function CartEmpty() {
  const { setPageType } = usePageType();

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <p className="text-base font-normal text-muted">Your cart is empty</p>
      <Button
        as="a"
        href="/tv"
        className="px-5 py-3"
        onClick={(e) => {
          e.preventDefault();
          setPageType('tv');
        }}
      >
        Continue Shopping
      </Button>
    </div>
  );
}
