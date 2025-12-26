import React, { useState, useRef } from 'react';
import MenuItemCard from './MenuItemCard';
import Hero from './Hero';
import ProductDetailModal from './ProductDetailModal';
import type { Product, ProductVariation, CartItem } from '../types';
import { Search, Filter, Package } from 'lucide-react';

interface MenuProps {
  menuItems: Product[];
  addToCart: (product: Product, variation?: ProductVariation, quantity?: number) => void;
  cartItems: CartItem[];
  updateQuantity: (index: number, quantity: number) => void;
}

const Menu: React.FC<MenuProps> = ({ menuItems, addToCart, cartItems }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'purity'>('name');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productsRef = useRef<HTMLDivElement | null>(null);

  // Filter products based on search
  const filteredProducts = menuItems.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.base_price - b.base_price;
      case 'purity':
        return b.purity_percentage - a.purity_percentage;
      default:
        return 0;
    }
  });

  const getCartQuantity = (productId: string, variationId?: string) => {
    return cartItems
      .filter(item =>
        item.product.id === productId &&
        (variationId ? item.variation?.id === variationId : !item.variation)
      )
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <>
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, variation, quantity) => {
            addToCart(product, variation, quantity);
          }}
        />
      )}

      <div className="min-h-screen bg-luxury-black">
        <Hero
          onShopAll={() => {
            productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />

        <div className="container mx-auto px-4 py-16" ref={productsRef}>
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gold-400 mb-3">
              Our Collection
            </h2>
            <p className="text-luxury-cream/60 max-w-2xl mx-auto">
              Precision-formulated peptides for those who demand excellence
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent mt-8 max-w-md mx-auto" />
          </div>

          {/* Search and Filter Controls */}
          <div className="mb-10 flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-400/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 text-base bg-luxury-charcoal border border-gold-400/20 rounded-sm text-luxury-cream placeholder-luxury-cream/40 focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 sm:w-auto bg-luxury-charcoal rounded-sm px-4 py-3.5 border border-gold-400/20">
              <Filter className="text-gold-400/60 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'purity')}
                className="focus:outline-none bg-transparent font-medium text-luxury-cream text-sm"
              >
                <option value="name" className="bg-luxury-charcoal">Sort by Name</option>
                <option value="price" className="bg-luxury-charcoal">Sort by Price</option>
                <option value="purity" className="bg-luxury-charcoal">Sort by Purity</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8 flex items-center gap-2">
            <p className="text-luxury-cream/50 font-medium text-sm tracking-wide">
              Showing <span className="font-bold text-gold-400">{sortedProducts.length}</span> products
            </p>
          </div>

          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-luxury-charcoal rounded-sm p-12 max-w-md mx-auto border border-gold-400/20">
                <div className="bg-gold-400/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-10 h-10 text-gold-400" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-luxury-cream mb-2">No products found</h3>
                <p className="text-luxury-cream/60 mb-6">
                  {searchQuery
                    ? `No products match "${searchQuery}".`
                    : 'No products available.'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="btn-gold"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {sortedProducts.map((product) => (
                <MenuItemCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  cartQuantity={getCartQuantity(product.id)}
                  onProductClick={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
