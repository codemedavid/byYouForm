import React, { useState } from 'react';
import { useCOAPageSetting } from '../hooks/useCOAPageSetting';
import { ShoppingCart, Menu, X, MessageCircle, Calculator, FileText, HelpCircle, Truck, BookOpen } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { coaPageEnabled } = useCOAPageSetting();

  return (
    <>
      <header className="bg-luxury-black sticky top-0 z-50 border-b border-gold-400/20">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-5">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Brand */}
            <button
              onClick={() => { onMenuClick(); setMobileMenuOpen(false); }}
              className="flex items-center space-x-4 hover:opacity-90 transition-all group min-w-0 flex-1 max-w-[calc(100%-130px)] sm:max-w-none sm:flex-initial"
            >
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-gold-400/30 ring-1 ring-gold-400/20">
                  <img
                    src="/assets/logo.jpeg"
                    alt="byYOUFORM"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-left min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-playfair font-bold text-gold-400 leading-tight whitespace-nowrap overflow-hidden text-ellipsis tracking-wide">
                  byYOUFORM
                </h1>
                <p className="text-xs text-luxury-cream/60 font-medium flex items-center gap-1 tracking-wider uppercase">
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                    Bespoke Peptide Science
                  </span>
                </p>
              </div>
            </button>

            {/* Right Side Navigation */}
            <div className="flex items-center gap-2 md:gap-4 ml-auto">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-2 lg:gap-6">
                <button
                  onClick={onMenuClick}
                  className="text-sm font-medium text-luxury-cream/80 hover:text-gold-400 transition-colors tracking-wide"
                >
                  Products
                </button>
                <a
                  href="/track-order"
                  className="text-sm font-medium text-luxury-cream/80 hover:text-gold-400 transition-colors flex items-center gap-1.5 tracking-wide"
                >
                  <Truck className="w-4 h-4" />
                  Track Order
                </a>
                <a
                  href="/calculator"
                  className="text-sm font-medium text-luxury-cream/80 hover:text-gold-400 transition-colors flex items-center gap-1.5 tracking-wide"
                >
                  <Calculator className="w-4 h-4" />
                  Calculator
                </a>
                {coaPageEnabled && (
                  <a
                    href="/coa"
                    className="text-sm font-medium text-luxury-cream/80 hover:text-gold-400 transition-colors flex items-center gap-1.5 tracking-wide"
                  >
                    <FileText className="w-4 h-4" />
                    Lab Tests
                  </a>
                )}
                <a
                  href="/faq"
                  className="text-sm font-medium text-luxury-cream/80 hover:text-gold-400 transition-colors flex items-center gap-1.5 tracking-wide"
                >
                  <HelpCircle className="w-4 h-4" />
                  FAQ
                </a>
                <a
                  href="/peptalk"
                  className="text-sm font-medium text-luxury-cream/80 hover:text-gold-400 transition-colors flex items-center gap-1.5 tracking-wide"
                >
                  <BookOpen className="w-4 h-4" />
                  Peptalk
                </a>
                <a
                  href="https://t.me/+KLV9YUAhUFQwZDI1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-luxury-cream/80 hover:text-gold-400 transition-colors flex items-center gap-1.5 tracking-wide"
                >
                  <MessageCircle className="w-4 h-4" />
                  Community
                </a>
              </nav>

              {/* Cart Button */}
              <button
                onClick={onCartClick}
                className="relative p-2 text-luxury-cream/80 hover:text-gold-400 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-400 text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-luxury-cream/80 hover:text-gold-400 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div
            className="absolute top-0 right-0 bottom-0 w-[300px] bg-luxury-black border-l border-gold-400/20 flex flex-col animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-gold-400/20">
              <span className="font-playfair font-bold text-lg text-gold-400 tracking-wide">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -mr-2 text-luxury-cream/60 hover:text-gold-400 transition-colors rounded-full hover:bg-gold-400/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => {
                    onMenuClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-4 p-4 rounded-sm text-left font-medium text-luxury-cream/80 hover:bg-gold-400/10 hover:text-gold-400 transition-all group"
                >
                  <div className="p-2 rounded-sm bg-gold-400/10 group-hover:bg-gold-400/20 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-400"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                  </div>
                  <span className="tracking-wide">Products</span>
                </button>
                <a
                  href="/track-order"
                  className="flex items-center gap-4 p-4 rounded-sm text-left font-medium text-luxury-cream/80 hover:bg-gold-400/10 hover:text-gold-400 transition-all group"
                >
                  <div className="p-2 rounded-sm bg-gold-400/10 group-hover:bg-gold-400/20 transition-all">
                    <Truck className="w-5 h-5 text-gold-400" />
                  </div>
                  <span className="tracking-wide">Track Order</span>
                </a>
                <a
                  href="/calculator"
                  className="flex items-center gap-4 p-4 rounded-sm text-left font-medium text-luxury-cream/80 hover:bg-gold-400/10 hover:text-gold-400 transition-all group"
                >
                  <div className="p-2 rounded-sm bg-gold-400/10 group-hover:bg-gold-400/20 transition-all">
                    <Calculator className="w-5 h-5 text-gold-400" />
                  </div>
                  <span className="tracking-wide">Peptide Calculator</span>
                </a>
                <a
                  href="/coa"
                  className="flex items-center gap-4 p-4 rounded-sm text-left font-medium text-luxury-cream/80 hover:bg-gold-400/10 hover:text-gold-400 transition-all group"
                >
                  <div className="p-2 rounded-sm bg-gold-400/10 group-hover:bg-gold-400/20 transition-all">
                    <FileText className="w-5 h-5 text-gold-400" />
                  </div>
                  <span className="tracking-wide">Lab Tests (COA)</span>
                </a>
                <a
                  href="/faq"
                  className="flex items-center gap-4 p-4 rounded-sm text-left font-medium text-luxury-cream/80 hover:bg-gold-400/10 hover:text-gold-400 transition-all group"
                >
                  <div className="p-2 rounded-sm bg-gold-400/10 group-hover:bg-gold-400/20 transition-all">
                    <HelpCircle className="w-5 h-5 text-gold-400" />
                  </div>
                  <span className="tracking-wide">FAQ</span>
                </a>
                <a
                  href="/peptalk"
                  className="flex items-center gap-4 p-4 rounded-sm text-left font-medium text-luxury-cream/80 hover:bg-gold-400/10 hover:text-gold-400 transition-all group"
                >
                  <div className="p-2 rounded-sm bg-gold-400/10 group-hover:bg-gold-400/20 transition-all">
                    <BookOpen className="w-5 h-5 text-gold-400" />
                  </div>
                  <span className="tracking-wide">Peptalk</span>
                </a>
                <a
                  href="https://t.me/+KLV9YUAhUFQwZDI1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-sm text-left font-medium text-luxury-cream/80 hover:bg-gold-400/10 hover:text-gold-400 transition-all group"
                >
                  <div className="p-2 rounded-sm bg-gold-400/10 group-hover:bg-gold-400/20 transition-all">
                    <MessageCircle className="w-5 h-5 text-gold-400" />
                  </div>
                  <span className="tracking-wide">Join Community</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
