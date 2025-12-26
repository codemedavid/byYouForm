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
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle gold gradient orbs */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-gold-400/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/2 rounded-full blur-3xl" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />
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
