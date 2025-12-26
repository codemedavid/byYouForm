import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FlaskConical, Package, CreditCard, Truck, ArrowLeft, MessageCircle, HelpCircle, Dna } from 'lucide-react';
import { useFAQs } from '../hooks/useFAQs';

const categoryIcons: { [key: string]: React.ReactElement } = {
    'PRODUCT & USAGE': <FlaskConical className="w-5 h-5" />,
    'ORDERING & PACKAGING': <Package className="w-5 h-5" />,
    'PAYMENT METHODS': <CreditCard className="w-5 h-5" />,
    'SHIPPING & DELIVERY': <Truck className="w-5 h-5" />,
};

const FAQ: React.FC = () => {
    const { faqs, categories, loading } = useFAQs();
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const toggleItem = (id: string) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const filteredFAQs = activeCategory
        ? faqs.filter(faq => faq.category === activeCategory)
        : faqs;

    const telegramUrl = `https://t.me/09658032685`;

    if (loading) {
        return (
            <div className="min-h-screen bg-luxury-black flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-luxury-black">
            {/* Header */}
            <div className="bg-luxury-black border-b border-gold-400/20 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-5">
                    <div className="flex items-center gap-4">
                        <a
                            href="/"
                            className="p-2 hover:bg-gold-400/10 rounded-sm transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 text-luxury-cream/60 group-hover:text-gold-400" />
                        </a>
                        <div className="flex items-center gap-3">
                            <Dna className="w-6 h-6 text-gold-400" />
                            <h1 className="text-xl md:text-2xl font-playfair font-bold text-gold-400">Frequently Asked Questions</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-10">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-6 py-2.5 rounded-sm text-sm font-semibold transition-all border tracking-wide ${activeCategory === null
                            ? 'bg-gold-400 text-black border-gold-400'
                            : 'bg-transparent text-luxury-cream/70 border-gold-400/30 hover:border-gold-400 hover:text-gold-400'
                            }`}
                    >
                        All
                    </button>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2.5 rounded-sm text-xs md:text-sm font-semibold transition-all flex items-center gap-2 border tracking-wide ${activeCategory === category
                                ? 'bg-gold-400 text-black border-gold-400'
                                : 'bg-transparent text-luxury-cream/70 border-gold-400/30 hover:border-gold-400 hover:text-gold-400'
                                }`}
                        >
                            <span className={activeCategory === category ? 'text-black' : 'text-gold-400'}>
                                {categoryIcons[category]}
                            </span>
                            {category}
                        </button>
                    ))}
                </div>

                {/* FAQ Items by Category */}
                {(activeCategory ? [activeCategory] : categories).map(category => (
                    <div key={category} className="mb-12">
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-sm border border-gold-400/30 bg-luxury-charcoal">
                            <span className="text-gold-400">
                                {categoryIcons[category] || <HelpCircle className="w-5 h-5" />}
                            </span>
                            <h2 className="font-playfair font-bold text-sm md:text-base uppercase tracking-wider text-gold-400">{category}</h2>
                        </div>

                        <div className="space-y-4">
                            {filteredFAQs
                                .filter(faq => faq.category === category)
                                .map(faq => (
                                    <div
                                        key={faq.id}
                                        className="bg-luxury-charcoal rounded-sm border border-gold-400/10 hover:border-gold-400/30 transition-all duration-200"
                                    >
                                        <button
                                            onClick={() => toggleItem(faq.id)}
                                            className="w-full px-6 py-5 flex items-start justify-between text-left group gap-4"
                                        >
                                            <span className="font-semibold text-luxury-cream text-base md:text-lg group-hover:text-gold-400 transition-colors leading-snug">
                                                {faq.question}
                                            </span>
                                            {openItems.has(faq.id) ? (
                                                <ChevronUp className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-luxury-cream/40 group-hover:text-gold-400 flex-shrink-0 transition-colors mt-1" />
                                            )}
                                        </button>
                                        {openItems.has(faq.id) && (
                                            <div className="px-6 pb-6 pt-0">
                                                <div className="h-px w-full bg-gradient-to-r from-gold-400/30 via-gold-400/10 to-transparent mb-4"></div>
                                                <p className="text-luxury-cream/70 whitespace-pre-line leading-relaxed text-base">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}

                {/* Contact CTA */}
                <div className="mt-16 bg-luxury-charcoal rounded-sm border border-gold-400/30 p-8 md:p-10 text-center">
                    <h3 className="text-xl md:text-2xl font-playfair font-bold text-gold-400 mb-3">
                        Still have questions?
                    </h3>
                    <p className="text-luxury-cream/60 mb-8 max-w-md mx-auto">
                        Our team is here to assist you with personalized guidance for your wellness journey.
                    </p>
                    <a
                        href={telegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gold-400 text-black px-8 py-4 rounded-sm font-semibold hover:bg-gold-300 transition-all shadow-gold hover:shadow-gold-lg"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
