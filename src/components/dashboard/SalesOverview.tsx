import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Package, Activity } from 'lucide-react';

interface DashboardMetrics {
    total_orders: number;
    total_revenue: number;
    total_units: number;
    average_order_value: number;
}

interface SalesOverviewProps {
    currentMetrics: DashboardMetrics;
    previousMetrics: DashboardMetrics | null;
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

const MetricCard: React.FC<{
    title: string;
    value: string | number;
    subValue?: string;
    trend?: number; // Percent change
    icon: React.ReactNode;
    color: string;
    loading: boolean;
}> = ({ title, value, subValue, trend, icon, color, loading }) => {
    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-soft p-4 border border-gray-100 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
        );
    }

    const isPositive = trend !== undefined && trend >= 0;
    const trendColor = isPositive ? 'text-green-600' : 'text-red-600';
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
        <div className="bg-white rounded-xl shadow-soft p-4 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
                    {React.cloneElement(icon as React.ReactElement, { className: `w-5 h-5 ${color.replace('bg-', 'text-')}` })}
                </div>
                <span className="text-sm font-medium text-gray-500">{title}</span>
            </div>

            <div className="flex items-end justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-navy-900">{value}</h3>
                    {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
                </div>

                {trend !== undefined && (
                    <div className={`flex items-center gap-1 text-xs font-bold ${trendColor} bg-opacity-10 px-2 py-1 rounded-full ${isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
                        <TrendIcon className="w-3 h-3" />
                        <span>{Math.abs(trend).toFixed(1)}%</span>
                    </div>
                )}

                {trend === undefined && previousMetrics === null && (
                    <div className="text-xs text-gray-400">No previous data</div>
                )}
            </div>
        </div>
    );
};

const SalesOverview: React.FC<SalesOverviewProps> = ({ currentMetrics, previousMetrics, loading, timeframe }) => {

    const calculateTrend = (current: number, previous: number) => {
        if (!previous) return current > 0 ? 100 : 0;
        return ((current - previous) / previous) * 100;
    };

    const revenueTrend = previousMetrics
        ? calculateTrend(currentMetrics.total_revenue, previousMetrics.total_revenue)
        : undefined;

    const ordersTrend = previousMetrics
        ? calculateTrend(currentMetrics.total_orders, previousMetrics.total_orders)
        : undefined;

    const unitsTrend = previousMetrics
        ? calculateTrend(currentMetrics.total_units, previousMetrics.total_units)
        : undefined;

    const aovTrend = previousMetrics
        ? calculateTrend(currentMetrics.average_order_value, previousMetrics.average_order_value)
        : undefined;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
                title="Total Revenue"
                value={formatCurrency(currentMetrics.total_revenue)}
                trend={revenueTrend}
                icon={<DollarSign />}
                color="bg-theme-accent"
                loading={loading}
            />
            <MetricCard
                title="Total Orders"
                value={currentMetrics.total_orders}
                trend={ordersTrend}
                icon={<ShoppingBag />}
                color="bg-blue-500"
                loading={loading}
            />
            <MetricCard
                title="Units Sold"
                value={currentMetrics.total_units}
                trend={unitsTrend}
                icon={<Package />}
                color="bg-purple-500"
                loading={loading}
            />
            <MetricCard
                title="Avg. Order Value"
                value={formatCurrency(currentMetrics.average_order_value)}
                trend={aovTrend}
                icon={<Activity />}
                color="bg-orange-500"
                loading={loading}
            />
        </div>
    );
};

export default SalesOverview;
