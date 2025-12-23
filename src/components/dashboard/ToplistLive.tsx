import React, { useState } from 'react';
import { Trophy, Medal, Flame, ArrowUpRight } from 'lucide-react';

interface ProductRanking {
    product_name: string;
    units_sold: number;
    revenue: number;
}

interface ToplistLiveProps {
    rankings: ProductRanking[];
    loading: boolean;
    timeframe: 'daily' | 'weekly' | 'monthly';
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const ToplistLive: React.FC<ToplistLiveProps> = ({ rankings, loading, timeframe }) => {
    const [sortBy, setSortBy] = useState<'units' | 'revenue'>('units');

    // Sort local copy of data to allow toggling without refetch
    const sortedRankings = [...rankings].sort((a, b) => {
        if (sortBy === 'units') return b.units_sold - a.units_sold;
        return b.revenue - a.revenue;
    });

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 min-h-[400px]">
                <div className="flex items-center justify-between mb-6">
                    <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    const getRankIcon = (index: number) => {
        switch (index) {
            case 0: return <Trophy className="w-5 h-5 text-yellow-500" />;
            case 1: return <Medal className="w-5 h-5 text-gray-400" />;
            case 2: return <Medal className="w-5 h-5 text-orange-400" />;
            default: return <span className="font-bold text-gray-400 w-5 text-center">{index + 1}</span>;
        }
    };

    const getTimeframeLabel = () => {
        switch (timeframe) {
            case 'daily': return 'Today';
            case 'weekly': return 'This Week';
            case 'monthly': return 'This Month';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-theme-text flex items-center gap-2">
                        🏆 Top Selling Analysis
                    </h3>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-[10px] font-bold animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                        LIVE
                    </div>
                </div>

                <div className="flex bg-gray-100 rounded-lg p-1 text-xs font-semibold">
                    <button
                        onClick={() => setSortBy('units')}
                        className={`px-3 py-1 rounded-md transition-all ${sortBy === 'units' ? 'bg-white shadow text-navy-900' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        By Units
                    </button>
                    <button
                        onClick={() => setSortBy('revenue')}
                        className={`px-3 py-1 rounded-md transition-all ${sortBy === 'revenue' ? 'bg-white shadow text-navy-900' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        By Revenue
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
                {sortedRankings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                        <ShoppingBag className="w-12 h-12 mb-2 opacity-20" />
                        <p>No sales yet {getTimeframeLabel().toLowerCase()}</p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {sortedRankings.map((product, index) => (
                            <div
                                key={product.product_name}
                                className={`group flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100 ${index < 3 ? 'bg-gradient-to-r from-gray-50/50 to-transparent' : ''
                                    }`}
                            >
                                <div className="flex items-center justify-center w-8 h-8 mr-3 shrink-0">
                                    {getRankIcon(index)}
                                </div>

                                <div className="flex-1 min-w-0 mr-4">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-sm text-gray-900 truncate">
                                            {product.product_name}
                                        </h4>
                                        {index === 0 && (
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-600">
                                                <Flame className="w-3 h-3 mr-0.5" /> HOT
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center gap-3 mt-0.5">
                                        <span>{product.units_sold} units sold</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span>{formatCurrency(product.revenue)} revenue</span>
                                    </div>
                                </div>

                                <div className="text-right shrink-0">
                                    <div className="text-sm font-bold text-navy-900">
                                        {sortBy === 'units' ? product.units_sold : formatCurrency(product.revenue)}
                                    </div>
                                    <div className="text-[10px] text-gray-400 uppercase font-semibold">
                                        {sortBy === 'units' ? 'UNITS' : 'PHP'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>


            <div className="p-3 border-t border-gray-100 bg-gray-50 text-center">
                <button className="text-xs font-semibold text-theme-accent hover:text-navy-900 transition-colors flex items-center justify-center gap-1 w-full">
                    View Detailed Report <ArrowUpRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
};
import { ShoppingBag } from 'lucide-react';

export default ToplistLive;
