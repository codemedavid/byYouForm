import React, { useState, useEffect } from 'react';
import { ArrowRight, Dna, Shield, Sparkles } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface HeroProps {
  onShopAll: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopAll }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { siteSettings } = useSiteSettings();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative bg-luxury-black overflow-hidden min-h-[85vh] flex items-center">
      {/* Background Effects - Layered for Depth */}
      <div className="absolute inset-0">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-luxury-charcoal/50 to-luxury-black" />

        {/* Gold gradient orbs */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gold-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-gold-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-400/3 rounded-full blur-3xl" />

        {/* Silver/platinum accent orbs */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gray-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gray-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />

        {/* Diagonal gold lines - subtle accent */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 100px,
              rgba(212, 175, 55, 0.4) 100px,
              rgba(212, 175, 55, 0.4) 101px
            )`
          }}
        />

        {/* Grid pattern - gold and silver mix */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px),
              linear-gradient(rgba(192, 192, 192, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(192, 192, 192, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 80px 80px, 40px 40px, 40px 40px'
          }}
        />

        {/* Radial gradient spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 70%)'
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-64 h-64 border-l border-t border-gold-400/10" />
        <div className="absolute top-0 right-0 w-64 h-64 border-r border-t border-gold-400/10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 border-l border-b border-gold-400/10" />
        <div className="absolute bottom-0 right-0 w-64 h-64 border-r border-b border-gold-400/10" />

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold-400/40 rounded-full animate-pulse" style={{ animationDuration: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-gold-400/30 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-gray-400/40 rounded-full animate-pulse" style={{ animationDuration: '2.5s' }} />
        <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-gold-400/50 rounded-full animate-pulse" style={{ animationDuration: '1.8s' }} />
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-gray-300/30 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />

        {/* Horizontal accent lines */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/10 to-transparent" />
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center">

          {/* Content */}
          <div className={`space-y-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

            {/* DNA Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/30 mx-auto">
              <Dna className="w-4 h-4 text-gold-400" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-gold-400">
                Elite Longevity Science
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-playfair font-bold leading-[1.1] tracking-tight">
                <span className="text-gold-400">Personalized Peptide Science,</span>
                <br />
                <span className="text-luxury-cream">Designed for You</span>
              </h1>

              <p className="text-lg md:text-xl text-luxury-champagne/80 font-light max-w-2xl mx-auto leading-relaxed">
                Advanced genetic and peptide solutions tailored to your biology, goals, and longevity.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <button
                onClick={onShopAll}
                className="group relative px-10 py-4 bg-gold-400 text-black rounded-sm font-semibold shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2 tracking-wide">
                  Explore Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <a
                href="/calculator"
                className="px-10 py-4 bg-transparent text-gold-400 border border-gold-400 rounded-sm font-semibold hover:bg-gold-400/10 transition-all tracking-wide flex items-center justify-center gap-2"
              >
                Peptide Calculator
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="pt-12">
              <div className="h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent mb-8" />

              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                <div className="flex items-center gap-3 text-sm text-luxury-cream/60">
                  <div className="p-2 rounded-full bg-gold-400/10">
                    <Shield className="w-4 h-4 text-gold-400" />
                  </div>
                  <span className="tracking-wide">Lab Verified</span>
                </div>
                <div className="hidden sm:block w-px h-8 bg-gold-400/20" />
                <div className="flex items-center gap-3 text-sm text-luxury-cream/60">
                  <div className="p-2 rounded-full bg-gold-400/10">
                    <Dna className="w-4 h-4 text-gold-400" />
                  </div>
                  <span className="tracking-wide">Precision Formulated</span>
                </div>
                <div className="hidden sm:block w-px h-8 bg-gold-400/20" />
                <div className="flex items-center gap-3 text-sm text-luxury-cream/60">
                  <div className="p-2 rounded-full bg-gold-400/10">
                    <Sparkles className="w-4 h-4 text-gold-400" />
                  </div>
                  <span className="tracking-wide">Bespoke Wellness</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
