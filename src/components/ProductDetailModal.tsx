import React, { useState } from 'react';
import { X, Package, Beaker, ShoppingCart, Plus, Minus, Dna, Shield } from 'lucide-react';
import type { Product, ProductVariation } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, variation: ProductVariation | undefined, quantity: number) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  // Select first available variation, or first variation if all are out of stock
  const getFirstAvailableVariation = () => {
    if (!product.variations || product.variations.length === 0) return undefined;
    const available = product.variations.find(v => v.stock_quantity > 0);
    return available || product.variations[0];
  };

  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>(
    getFirstAvailableVariation()
  );
  const [quantity, setQuantity] = useState(1);

  const hasDiscount = product.discount_active && product.discount_price;
  const currentPrice = selectedVariation?.price || (hasDiscount ? product.discount_price! : product.base_price);
  const showPurity = Boolean(product.purity_percentage);

  // Check if product has any available stock
  const hasAnyStock = product.variations && product.variations.length > 0
    ? product.variations.some(v => v.stock_quantity > 0)
    : product.stock_quantity > 0;

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariation, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-luxury-charcoal rounded-sm shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden my-2 sm:my-8 border border-gold-400/20">
        {/* Header */}
        <div className="bg-luxury-black text-luxury-cream p-4 sm:p-5 md:p-6 relative border-b border-gold-400/20">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-gold-400/10 rounded-sm transition-colors text-luxury-cream/60 hover:text-gold-400"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <div className="pr-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-gold-400 mb-2">{product.name}</h2>
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              {showPurity && (
                <span className="inline-flex items-center px-2 py-1 md:px-3 md:py-1.5 rounded-sm text-xs md:text-sm font-medium bg-gold-400/10 border border-gold-400/30 text-gold-400">
                  <Dna className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  {product.purity_percentage}% Pure
                </span>
              )}
              {product.featured && (
                <span className="inline-flex items-center px-2 py-1 md:px-3 md:py-1.5 rounded-sm text-xs md:text-sm font-medium bg-gold-400/10 border border-gold-400/30 text-gold-400">
                  Featured
                </span>
              )}
              {hasDiscount && (
                <span className="inline-flex items-center px-2 py-1 md:px-3 md:py-1.5 rounded-sm text-xs md:text-sm font-medium bg-gold-400 text-black">
                  {Math.round((1 - product.discount_price! / product.base_price) * 100)}% OFF
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6 overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(90vh-280px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Left Column */}
            <div className="space-y-4 md:space-y-6">
              {/* Product Image */}
              {product.image_url && (
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-luxury-black rounded-sm overflow-hidden border border-gold-400/20">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-sm sm:text-base md:text-lg font-playfair font-bold text-gold-400 mb-2 flex items-center gap-2">
                  <Beaker className="w-4 h-4 md:w-5 md:h-5" />
                  Product Description
                </h3>
                <p className="text-sm md:text-base text-luxury-cream/70 leading-relaxed">{product.description}</p>
              </div>

              {/* Complete Set Inclusions */}
              {product.inclusions && product.inclusions.length > 0 && (
                <div className="bg-luxury-black rounded-sm p-4 md:p-5 border border-gold-400/20">
                  <h3 className="text-sm sm:text-base md:text-lg font-playfair font-bold text-gold-400 mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4 md:w-5 md:h-5" />
                    Complete Set Includes
                  </h3>
                  <ul className="space-y-2">
                    {product.inclusions.map((item, index) => (
                      <li key={index} className="text-xs sm:text-sm text-luxury-cream/70 flex items-start gap-2">
                        <span className="text-gold-400 font-bold mt-0.5">✓</span>
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Scientific Details */}
              <div className="bg-luxury-black rounded-sm p-4 md:p-5 border border-gold-400/20">
                <h3 className="text-sm sm:text-base md:text-lg font-playfair font-bold text-gold-400 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 md:w-5 md:h-5" />
                  Scientific Information
                </h3>
                <div className="space-y-2">
                  {showPurity && (
                    <div className="flex justify-between">
                      <span className="text-luxury-cream/50 text-xs sm:text-sm">Purity:</span>
                      <span className="font-semibold text-gold-400 text-xs sm:text-sm">{product.purity_percentage}%</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-luxury-cream/50 text-xs sm:text-sm">Storage:</span>
                    <span className="font-medium text-luxury-cream/70 text-xs sm:text-sm">{product.storage_conditions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-luxury-cream/50 text-xs sm:text-sm">Stock:</span>
                    <span className={`font-medium text-xs sm:text-sm ${(product.variations && product.variations.length > 0
                      ? product.variations.some(v => v.stock_quantity > 0)
                      : product.stock_quantity > 0)
                      ? 'text-gold-400'
                      : 'text-red-400'
                      }`}>
                      {product.variations && product.variations.length > 0
                        ? product.variations.reduce((sum, v) => sum + v.stock_quantity, 0)
                        : product.stock_quantity} units
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Purchase Section */}
            <div className="space-y-4 md:space-y-6">
              {/* Price */}
              <div className="bg-luxury-black rounded-sm p-4 md:p-6 border border-gold-400/30">
                <div className="text-center mb-4">
                  {hasDiscount ? (
                    <>
                      {/* Original Price - Strikethrough */}
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-lg sm:text-xl md:text-2xl text-luxury-cream/40 line-through font-medium">
                          ₱{product.base_price.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-black bg-gold-400 px-2 py-1 rounded-sm">
                          {Math.round((1 - product.discount_price! / product.base_price) * 100)}% OFF
                        </span>
                      </div>
                      {/* Sale Price - Prominent */}
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold-400 mb-2">
                        ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                      </div>
                      <div className="inline-block bg-gold-400/10 text-gold-400 px-3 py-1 rounded-sm text-xs sm:text-sm font-medium border border-gold-400/30">
                        You Save ₱{(product.base_price - product.discount_price!).toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                      </div>
                    </>
                  ) : (
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold-400">
                      ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                    </div>
                  )}
                </div>

                {/* Size Selection */}
                {product.variations && product.variations.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-xs sm:text-sm font-bold text-luxury-cream/70 mb-2">
                      Select Size:
                    </label>
                    <select
                      value={selectedVariation?.id || ''}
                      onChange={(e) => {
                        const variation = product.variations?.find(v => v.id === e.target.value);
                        if (variation && variation.stock_quantity > 0) {
                          setSelectedVariation(variation);
                        }
                      }}
                      className="w-full px-3 py-3 md:px-4 md:py-3.5 bg-luxury-charcoal border border-gold-400/30 rounded-sm text-luxury-cream focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 text-sm md:text-base hover:border-gold-400 transition-colors"
                    >
                      {product.variations.map((variation) => {
                        const isOutOfStock = variation.stock_quantity === 0;
                        return (
                          <option
                            key={variation.id}
                            value={variation.id}
                            disabled={isOutOfStock}
                            className="bg-luxury-charcoal"
                          >
                            {variation.name} - ₱{variation.price.toLocaleString('en-PH')}
                            {isOutOfStock ? ' (Out of Stock)' : ''}
                          </option>
                        );
                      })}
                    </select>
                    {selectedVariation && selectedVariation.stock_quantity === 0 && (
                      <p className="text-xs text-gold-400 mt-2 font-medium">
                        This size is currently out of stock. Please select another size.
                      </p>
                    )}
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-4">
                  <label className="block text-xs sm:text-sm font-bold text-luxury-cream/70 mb-2">
                    Quantity:
                  </label>
                  <div className="flex items-center justify-center gap-3 md:gap-4">
                    <button
                      onClick={decrementQuantity}
                      className="p-2.5 md:p-3 bg-luxury-charcoal border border-gold-400/30 hover:border-gold-400 hover:bg-gold-400/10 rounded-sm transition-all"
                      disabled={!product.available}
                    >
                      <Minus className="w-4 h-4 md:w-5 md:h-5 text-gold-400" />
                    </button>
                    <span className="text-xl md:text-2xl font-bold text-luxury-cream min-w-[50px] md:min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="p-2.5 md:p-3 bg-luxury-charcoal border border-gold-400/30 hover:border-gold-400 hover:bg-gold-400/10 rounded-sm transition-all"
                      disabled={!product.available}
                    >
                      <Plus className="w-4 h-4 md:w-5 md:h-5 text-gold-400" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-luxury-charcoal rounded-sm p-3 md:p-4 mb-4 border border-gold-400/20">
                  <div className="flex justify-between items-center">
                    <span className="text-luxury-cream/60 font-medium text-sm md:text-base">Total:</span>
                    <span className="text-2xl md:text-3xl font-bold text-gold-400">
                      ₱{(currentPrice * quantity).toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.available || !hasAnyStock || (selectedVariation && selectedVariation.stock_quantity === 0) || (!selectedVariation && product.stock_quantity === 0)}
                  className="w-full bg-gold-400 hover:bg-gold-300 text-black py-3 md:py-4 rounded-sm font-bold text-sm md:text-base shadow-gold hover:shadow-gold-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                  {!product.available
                    ? 'Unavailable'
                    : (!hasAnyStock || (selectedVariation && selectedVariation.stock_quantity === 0) || (!selectedVariation && product.stock_quantity === 0)
                      ? 'Out of Stock'
                      : 'Add to Cart')}
                </button>
              </div>

              {/* Stock Alert */}
              {product.available && (product.variations && product.variations.length > 0
                ? product.variations.some(v => v.stock_quantity > 0 && v.stock_quantity < 10)
                : product.stock_quantity < 10 && product.stock_quantity > 0) && (
                  <div className="bg-gold-400/10 border border-gold-400/30 rounded-sm p-4">
                    <p className="text-sm text-gold-400 font-medium flex items-center gap-2">
                      <span className="text-lg">⚠️</span>
                      Low stock! Only {product.variations && product.variations.length > 0
                        ? product.variations.reduce((sum, v) => sum + v.stock_quantity, 0)
                        : product.stock_quantity} units left
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
