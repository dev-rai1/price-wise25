
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ProfitChartProps {
  productData: {
    name: string;
    baseCost: number;
    desiredMargin: number;
    sku: string;
  };
  pricingStrategies: {
    conservative: number;
    balanced: number;
    aggressive: number;
  };
  operatingCosts: {
    rent: number;
    utilities: number;
    salaries: number;
    other: number;
  };
}

export const ProfitChart: React.FC<ProfitChartProps> = ({
  productData,
  pricingStrategies,
  operatingCosts
}) => {
  const chartData = [
    {
      strategy: 'Conservative',
      price: pricingStrategies.conservative,
      profit: pricingStrategies.conservative - productData.baseCost,
      margin: ((pricingStrategies.conservative - productData.baseCost) / pricingStrategies.conservative * 100)
    },
    {
      strategy: 'Balanced',
      price: pricingStrategies.balanced,
      profit: pricingStrategies.balanced - productData.baseCost,
      margin: ((pricingStrategies.balanced - productData.baseCost) / pricingStrategies.balanced * 100)
    },
    {
      strategy: 'Aggressive',
      price: pricingStrategies.aggressive,
      profit: pricingStrategies.aggressive - productData.baseCost,
      margin: ((pricingStrategies.aggressive - productData.baseCost) / pricingStrategies.aggressive * 100)
    }
  ];

  const costBreakdown = [
    { name: 'Base Cost', value: productData.baseCost, color: '#3b82f6' },
    { name: 'Rent', value: operatingCosts.rent, color: '#10b981' },
    { name: 'Utilities', value: operatingCosts.utilities, color: '#f59e0b' },
    { name: 'Salaries', value: operatingCosts.salaries, color: '#ef4444' },
    { name: 'Other', value: operatingCosts.other, color: '#8b5cf6' }
  ].filter(item => item.value > 0);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pricing Strategy Comparison */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Pricing Strategy Comparison</CardTitle>
          <CardDescription>Compare profit margins across different strategies</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="strategy" tick={{ fill: '#64748b' }} />
              <YAxis tick={{ fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value: number, name: string) => [
                  name === 'price' ? `$${value.toFixed(2)}` : 
                  name === 'profit' ? `$${value.toFixed(2)}` : 
                  `${value.toFixed(1)}%`,
                  name === 'price' ? 'Price' : 
                  name === 'profit' ? 'Profit' : 'Margin'
                ]}
              />
              <Bar dataKey="price" fill="url(#priceGradient)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill="url(#profitGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Cost Breakdown</CardTitle>
          <CardDescription>Visualize your cost structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  stroke="none"
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Cost']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-2">
              {costBreakdown.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-slate-800">${item.value.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Total Costs:</span>
                <span className="text-xl font-bold text-blue-600">
                  ${costBreakdown.reduce((sum, item) => sum + item.value, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
