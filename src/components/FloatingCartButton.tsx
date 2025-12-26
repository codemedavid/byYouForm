import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface FloatingCartButtonProps {
  itemCount: number;
  onCartClick: () => void;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ itemCount, onCartClick }) => {
  if (itemCount === 0) return null;

  return (
    <button
      onClick={onCartClick}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 bg-gold-400 hover:bg-gold-300 text-black rounded-full shadow-gold hover:shadow-gold-lg transition-all duration-300 transform hover:scale-110 z-50 p-3 md:p-4 group"
      aria-label="View cart"
    >
      <div className="relative">
        <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        <span className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-luxury-black text-gold-400 text-[10px] md:text-xs font-bold rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center border border-gold-400 shadow-lg">
          {itemCount}
        </span>
      </div>
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap hidden md:block">
        <div className="bg-luxury-charcoal text-luxury-cream text-xs md:text-sm px-3 md:px-4 py-2 md:py-2.5 rounded-sm shadow-lg border border-gold-400/20">
          {itemCount} item{itemCount !== 1 ? 's' : ''} in cart
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-luxury-charcoal border-r border-b border-gold-400/20"></div>
        </div>
      </div>
    </button>
  );
};

export default FloatingCartButton;
