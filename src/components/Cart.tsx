import React from 'react';
import { Trash2, ShoppingBag, ArrowLeft, CreditCard, Plus, Minus, Dna, Shield } from 'lucide-react';
import type { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout,
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <div className="bg-luxury-charcoal rounded-sm p-12 border border-gold-400/20">
            <div className="bg-gold-400/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-400/30">
              <ShoppingBag className="w-12 h-12 text-gold-400" />
            </div>
            <h2 className="text-2xl font-playfair font-bold text-luxury-cream mb-3">
              Your cart is empty
            </h2>
            <p className="text-luxury-cream/60 mb-8">
              Discover our premium peptide collection
            </p>
            <button
              onClick={onContinueShopping}
              className="bg-gold-400 hover:bg-gold-300 text-black px-8 py-4 rounded-sm font-semibold shadow-gold hover:shadow-gold-lg transform hover:-translate-y-0.5 transition-all w-full flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Browse Collection
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const finalTotal = totalPrice;

  return (
    <div className="min-h-screen bg-luxury-black py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <button
            onClick={onContinueShopping}
            className="text-gold-400 hover:text-gold-300 font-medium mb-6 flex items-center gap-2 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm md:text-base tracking-wide">Continue Shopping</span>
          </button>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-gold-400 flex items-center gap-3">
              Shopping Cart
            </h1>
            <button
              onClick={clearCart}
              className="text-luxury-cream/60 hover:text-gold-400 font-medium flex items-center gap-1.5 md:gap-2 transition-colors text-sm md:text-base"
            >
              <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
              Clear
            </button>
          </div>
          <div className="h-px bg-gradient-to-r from-gold-400/30 via-gold-400/10 to-transparent mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 md:space-y-5">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-luxury-charcoal rounded-sm p-4 md:p-6 transition-all animate-fadeIn border border-gold-400/10 hover:border-gold-400/30"
              >
                <div className="flex gap-4 md:gap-6">
                  {/* Product Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-luxury-black rounded-sm flex-shrink-0 flex items-center justify-center overflow-hidden border border-gold-400/20">
                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-3xl md:text-4xl font-playfair font-bold text-gold-400">
                        {item.product.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-playfair font-bold text-luxury-cream text-sm md:text-base mb-1 truncate">
                          {item.product.name}
                        </h3>
                        {item.variation && (
                          <p className="text-xs md:text-sm text-gold-400/80 font-medium">
                            {item.variation.name}
                          </p>
                        )}
                        {item.product.purity_percentage && item.product.purity_percentage > 0 ? (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] md:text-xs font-medium bg-gold-400/10 text-gold-400 border border-gold-400/20">
                              {item.product.purity_percentage}% Pure
                            </span>
                          </div>
                        ) : null}
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="p-1.5 md:p-2 text-luxury-cream/40 hover:text-gold-400 hover:bg-gold-400/10 rounded-sm transition-colors ml-2"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex justify-between items-center mt-3 md:mt-4">
                      <div className="flex items-center border border-gold-400/30 rounded-sm">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="p-1.5 md:p-2 hover:bg-gold-400/10 transition-colors"
                        >
                          <Minus className="w-3 h-3 md:w-4 md:h-4 text-gold-400" />
                        </button>
                        <span className="px-3 md:px-4 py-1.5 md:py-2 font-bold text-luxury-cream min-w-[32px] md:min-w-[40px] text-center text-sm md:text-base">
                          {item.quantity}
                          {(() => {
                            const availableStock = item.variation ? item.variation.stock_quantity : item.product.stock_quantity;
                            if (availableStock > 0) {
                              return <span className="block text-[10px] text-luxury-cream/40">/ {availableStock}</span>;
                            }
                            return null;
                          })()}
                        </span>
                        <button
                          onClick={() => {
                            const availableStock = item.variation ? item.variation.stock_quantity : item.product.stock_quantity;
                            if (item.quantity >= availableStock) {
                              alert(`Only ${availableStock} item(s) available in stock.`);
                              return;
                            }
                            updateQuantity(index, item.quantity + 1);
                          }}
                          disabled={(() => {
                            const availableStock = item.variation ? item.variation.stock_quantity : item.product.stock_quantity;
                            return item.quantity >= availableStock;
                          })()}
                          className="p-1.5 md:p-2 hover:bg-gold-400/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-3 h-3 md:w-4 md:h-4 text-gold-400" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xl md:text-2xl font-bold text-gold-400">
                          ₱{(item.price * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                        </div>
                        <div className="text-[10px] md:text-xs text-luxury-cream/50">
                          ₱{item.price.toLocaleString('en-PH', { minimumFractionDigits: 0 })} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-luxury-charcoal rounded-sm p-5 md:p-6 sticky top-24 border border-gold-400/20">
              <h2 className="text-lg md:text-xl font-playfair font-bold text-gold-400 mb-6 flex items-center gap-2">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-luxury-cream/70 text-sm md:text-base">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-semibold text-luxury-cream">₱{totalPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}</span>
                </div>
                <div className="flex flex-col gap-1 text-luxury-cream/60 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-gold-400/80 font-medium">Calculated at checkout</span>
                  </div>
                  <div className="mt-3 space-y-1.5 text-luxury-cream/50 text-xs">
                    <p className="font-semibold text-luxury-cream/70">J&T Shipping Rates:</p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li>Luzon: ₱150</li>
                      <li>Visayas: ₱120</li>
                      <li>Mindanao: ₱90</li>
                    </ul>
                    <p className="font-semibold text-luxury-cream/70 mt-2">Maxim Delivery:</p>
                    <p className="pl-4">₱0 (Booking fee paid by customer upon delivery)</p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent my-4" />

                <div className="flex justify-between items-center">
                  <span className="text-base md:text-lg font-bold text-luxury-cream">Total</span>
                  <span className="text-2xl md:text-3xl font-bold text-gold-400">
                    ₱{finalTotal.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                  </span>
                </div>
                <p className="text-xs text-luxury-cream/40 text-right">+ Shipping fee (calculated on checkout)</p>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-gold-400 hover:bg-gold-300 text-black py-3 md:py-4 rounded-sm font-semibold text-sm md:text-base shadow-gold hover:shadow-gold-lg transform hover:-translate-y-0.5 transition-all mb-3 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Checkout
              </button>

              <button
                onClick={onContinueShopping}
                className="w-full bg-transparent hover:bg-gold-400/10 text-gold-400 border border-gold-400/30 hover:border-gold-400 py-2.5 md:py-3 rounded-sm font-medium text-sm md:text-base transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gold-400/10 space-y-3">
                <div className="flex items-center gap-3 text-xs md:text-sm text-luxury-cream/60">
                  <div className="p-1.5 rounded-full bg-gold-400/10">
                    <Shield className="w-3.5 h-3.5 text-gold-400" />
                  </div>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm text-luxury-cream/60">
                  <div className="p-1.5 rounded-full bg-gold-400/10">
                    <Dna className="w-3.5 h-3.5 text-gold-400" />
                  </div>
                  <span>Lab-verified products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
