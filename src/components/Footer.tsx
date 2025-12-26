import React from 'react';
import { MessageCircle, Heart, HelpCircle, Calculator, FileText, Truck, BookOpen, Dna } from 'lucide-react';
import { useCOAPageSetting } from '../hooks/useCOAPageSetting';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { coaPageEnabled } = useCOAPageSetting();

  return (
    <footer className="bg-luxury-charcoal border-t border-gold-400/10 pt-16 pb-8">
      <div className="container mx-auto px-4">

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-12">

          {/* Brand Section */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gold-400/30 ring-1 ring-gold-400/20">
              <img
                src="/assets/logo.jpeg"
                alt="byYOUFORM"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <div className="font-playfair font-bold text-gold-400 text-xl tracking-wide">
                byYOUFORM
              </div>
              <div className="text-xs text-luxury-cream/50 tracking-[0.15em] uppercase">
                Bespoke Peptide Science
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 justify-center md:justify-end">
            <a
              href="/track-order"
              className="text-luxury-cream/60 hover:text-gold-400 transition-colors flex items-center gap-2 text-sm font-medium tracking-wide"
            >
              <Truck className="w-4 h-4" />
              Track Order
            </a>
            <a
              href="/calculator"
              className="text-luxury-cream/60 hover:text-gold-400 transition-colors flex items-center gap-2 text-sm font-medium tracking-wide"
            >
              <Calculator className="w-4 h-4" />
              Calculator
            </a>
            {coaPageEnabled && (
              <a
                href="/coa"
                className="text-luxury-cream/60 hover:text-gold-400 transition-colors flex items-center gap-2 text-sm font-medium tracking-wide"
              >
                <FileText className="w-4 h-4" />
                Lab Tests
              </a>
            )}
            <a
              href="/faq"
              className="text-luxury-cream/60 hover:text-gold-400 transition-colors flex items-center gap-2 text-sm font-medium tracking-wide"
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </a>
            <a
              href="/peptalk"
              className="text-luxury-cream/60 hover:text-gold-400 transition-colors flex items-center gap-2 text-sm font-medium tracking-wide"
            >
              <BookOpen className="w-4 h-4" />
              Peptalk
            </a>
            <a
              href="https://t.me/+fGtShIUkbB84YzZl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-luxury-cream/60 hover:text-gold-400 transition-colors flex items-center gap-2 text-sm font-medium tracking-wide"
            >
              <MessageCircle className="w-4 h-4" />
              Community
            </a>
          </div>

        </div>

        {/* Gold Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent mb-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-luxury-cream/40 flex items-center justify-center gap-2">
            <Dna className="w-3 h-3 text-gold-400/60" />
            © {currentYear} byYOUFORM. All rights reserved.
          </p>
          <p className="text-xs text-luxury-cream/40 flex items-center justify-center gap-1">
            Crafted with
            <Heart className="w-3 h-3 text-gold-400 fill-gold-400" />
            for precision wellness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
