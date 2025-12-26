import React from 'react';
import { Grid, FlaskConical, Sparkles, Leaf, Package } from 'lucide-react';
import { useCategories } from '../hooks/useCategories';

interface SubNavProps {
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const iconMap: { [key: string]: React.ReactElement } = {
  Grid: <Grid className="w-5 h-5" />,
  FlaskConical: <FlaskConical className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Leaf: <Leaf className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
};

const SubNav: React.FC<SubNavProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div className="bg-luxury-charcoal border-b border-gold-400/10 hidden md:block">
        <div className="container mx-auto px-4 py-4">
          <div className="flex space-x-3 overflow-x-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse bg-gold-400/10 h-10 w-32 rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <nav className="bg-luxury-charcoal sticky top-[64px] md:top-[80px] lg:top-[88px] z-40 border-b border-gold-400/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 py-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategoryClick(category.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-sm font-medium whitespace-nowrap
                  transition-all duration-200 text-sm border tracking-wide
                  ${isSelected
                    ? 'bg-gold-400 text-black border-gold-400'
                    : 'bg-transparent text-luxury-cream/70 border-gold-400/30 hover:border-gold-400 hover:text-gold-400'
                  }
                `}
              >
                <span>
                  {React.cloneElement(iconMap[category.icon] || <Grid className="w-4 h-4" />, {
                    className: `w-4 h-4 ${isSelected ? 'text-black' : 'text-gold-400/70'}`
                  })}
                </span>
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hide scrollbar for better aesthetics */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
};

export default SubNav;
