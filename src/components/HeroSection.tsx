import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import heroImage from '../assets/images/hero_shopease_banner_1792344901764.jpg';

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  return (
    <section className="relative overflow-hidden bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold tracking-wider uppercase text-stone-500">
                Curated Collection · 2026 Edition
              </span>
              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-950 leading-[1.1]"
                style={{ textWrap: 'balance' }}
              >
                Essential tools and craft objects for considered living.
              </h1>
              <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
                ShopEase brings together acoustically balanced audio, precision horology, handcrafted leather goods, and artisanal tableware. Built for daily durability.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
              >
                Browse Catalog
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Zero-Pill Quiet Editorial Trust Strip */}
            <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-stone-700" />
                <span>Complimentary shipping over $150</span>
              </div>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-stone-700" />
                <span>2-Year manufacturer warranty</span>
              </div>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-stone-700" />
                <span>30-Day risk-free returns</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Anchor */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-stone-200 bg-stone-200">
              <img
                src={heroImage}
                alt="ShopEase curated modern showroom with architectural furniture and crafted lifestyle items"
                className="w-full h-full object-cover object-center"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
