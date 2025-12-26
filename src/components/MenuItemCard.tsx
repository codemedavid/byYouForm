import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Package } from 'lucide-react';
import type { Product, ProductVariation } from '../types';

interface MenuItemCardProps {
  product: Product;
  onAddToCart: (product: Product, variation?: ProductVariation, quantity?: number) => void;
  cartQuantity?: number;
  onUpdateQuantity?: (index: number, quantity: number) => void;
  onProductClick?: (product: Product) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  product,
  onAddToCart,
  cartQuantity = 0,
  onProductClick,
}) => {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>(
    product.variations && product.variations.length > 0 ? product.variations[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  // Calculate current price considering both product and variation discounts
  const currentPrice = selectedVariation
    ? (selectedVariation.discount_active && selectedVariation.discount_price)
      ? selectedVariation.discount_price
      : selectedVariation.price
    : (product.discount_active && product.discount_price)
      ? product.discount_price
      : product.base_price;

  // Check if there's an active discount
  const hasDiscount = selectedVariation
    ? (selectedVariation.discount_active && selectedVariation.discount_price !== null)
    : (product.discount_active && product.discount_price !== null);

  // Get original price for strikethrough
  const originalPrice = selectedVariation ? selectedVariation.price : product.base_price;

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariation, quantity);
    setQuantity(1);
  };

  const availableStock = selectedVariation ? selectedVariation.stock_quantity : product.stock_quantity;

  // Check if product has any available stock (either in variations or product itself)
  const hasAnyStock = product.variations && product.variations.length > 0
    ? product.variations.some(v => v.stock_quantity > 0)
    : product.stock_quantity > 0;

  const incrementQuantity = () => {
    setQuantity(prev => {
      if (prev >= availableStock) {
        alert(`Only ${availableStock} item(s) available in stock.`);
        return prev;
      }
      return prev + 1;
    });
  };

  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="bg-luxury-charcoal h-full flex flex-col group relative border border-gold-400/20 rounded-sm overflow-hidden transition-all duration-300 hover:border-gold-400/50 hover:shadow-gold">
      {/* Click overlay for product details */}
      <div
        onClick={() => onProductClick?.(product)}
        className="absolute inset-x-0 top-0 h-48 z-10 cursor-pointer"
        title="View details"
      />

      {/* Product Image */}
      <div className="relative h-48 bg-luxury-black overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold-400/30">
            <Package className="w-12 h-12" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
          {product.featured && (
            <span className="badge badge-gold">
              Featured
            </span>
          )}
          {hasDiscount && (
            <span className="badge bg-gold-400 text-black">
              {Math.round((1 - currentPrice / originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Stock Status Overlay */}
        {(!product.available || !hasAnyStock) && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="bg-luxury-charcoal text-luxury-cream px-3 py-1 text-xs font-semibold rounded-sm border border-gold-400/20">
              {!product.available ? 'Unavailable' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-playfair font-semibold text-luxury-cream mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-luxury-cream/50 mb-3 line-clamp-2 min-h-[2.5rem]">{product.description}</p>

        {/* Variations (Sizes) */}
        <div className="mb-4 min-h-[4rem]">
          {product.variations && product.variations.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.variations.slice(0, 3).map((variation) => {
                const isOutOfStock = variation.stock_quantity === 0;
                return (
                  <button
                    key={variation.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isOutOfStock) {
                        setSelectedVariation(variation);
                      }
                    }}
                    disabled={isOutOfStock}
                    className={`
                      px-2 py-1 text-xs rounded-sm border transition-colors relative z-20
                      ${selectedVariation?.id === variation.id && !isOutOfStock
                        ? 'bg-gold-400 text-black border-gold-400'
                        : isOutOfStock
                          ? 'bg-luxury-black/50 text-luxury-cream/30 border-luxury-cream/10 cursor-not-allowed'
                          : 'bg-transparent text-luxury-cream/70 border-gold-400/30 hover:border-gold-400'
                      }
                    `}
                  >
                    {variation.name}
                  </button>
                );
              })}
              {product.variations.length > 3 && (
                <span className="text-xs text-luxury-cream/40 self-center">
                  +{product.variations.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex-1" />

        {/* Price and Cart Actions */}
        <div className="flex flex-col gap-3 mt-2">
          {hasDiscount ? (
            <div className="flex flex-col gap-1">
              {/* Original Price - Strikethrough */}
              <div className="flex items-center gap-2">
                <span className="text-base text-luxury-cream/40 line-through font-medium">
                  ₱{originalPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                </span>
                <span className="text-xs font-bold text-black bg-gold-400 px-2 py-0.5 rounded-sm">
                  {Math.round((1 - currentPrice / originalPrice) * 100)}% OFF
                </span>
              </div>
              {/* Sale Price - Prominent */}
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-gold-400">
                  ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                </span>
                <span className="text-xs text-luxury-cream/50">Sale Price</span>
              </div>
            </div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gold-400">
                ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
              </span>
            </div>
          )}

          <div className="flex items-center gap-1.5 sm:gap-2 relative z-20">
            {/* Quantity Controls */}
            <div className="flex items-center border border-gold-400/30 rounded-sm flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  decrementQuantity();
                }}
                className="p-1 sm:p-1.5 hover:bg-gold-400/10 transition-colors"
                disabled={!hasAnyStock || !product.available}
              >
                <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-gold-400" />
              </button>
              <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-medium text-luxury-cream">
                {quantity}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  incrementQuantity();
                }}
                className="p-1 sm:p-1.5 hover:bg-gold-400/10 transition-colors"
                disabled={quantity >= availableStock || !hasAnyStock || !product.available}
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gold-400" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (quantity > availableStock) {
                  alert(`Only ${availableStock} item(s) available in stock.`);
                  setQuantity(availableStock);
                  return;
                }
                handleAddToCart();
              }}
              disabled={!hasAnyStock || availableStock === 0 || !product.available}
              className="flex-1 min-w-0 bg-gold-400 text-black px-2 sm:px-3 py-1.5 sm:py-2 rounded-sm text-xs sm:text-sm font-semibold hover:bg-gold-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-2"
            >
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Add</span>
            </button>
          </div>

          {/* Cart Status */}
          {cartQuantity > 0 && (
            <div className="text-center text-xs text-gold-400 font-medium">
              {cartQuantity} in cart
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
