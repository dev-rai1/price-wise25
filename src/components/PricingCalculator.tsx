
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface PricingCalculatorProps {
  productData: {
    name: string;
    baseCost: number;
    desiredMargin: number;
    sku: string;
  };
  setProductData: (data: any) => void;
  operatingCosts: {
    rent: number;
    utilities: number;
    salaries: number;
    other: number;
  };
  setOperatingCosts: (costs: any) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  productData,
  setProductData,
  operatingCosts,
  setOperatingCosts
}) => {
  const handleProductChange = (field: string, value: string | number) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOperatingChange = (field: string, value: number) => {
    setOperatingCosts(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const totalOperatingCosts = Object.values(operatingCosts).reduce((sum, cost) => sum + cost, 0);

  return (
    <div className="space-y-6">
      {/* Product Information */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Product Information</CardTitle>
          <CardDescription>Enter your product details and costs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                value={productData.name}
                onChange={(e) => handleProductChange('name', e.target.value)}
                placeholder="Enter product name"
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={productData.sku}
                onChange={(e) => handleProductChange('sku', e.target.value)}
                placeholder="Product SKU"
                className="bg-white/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="baseCost">Base Cost ($)</Label>
            <Input
              id="baseCost"
              type="number"
              value={productData.baseCost}
              onChange={(e) => handleProductChange('baseCost', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="bg-white/50"
            />
          </div>

          <div className="space-y-4">
            <Label>Desired Profit Margin (%)</Label>
            <div className="px-4">
              <Slider
                value={[productData.desiredMargin]}
                onValueChange={(value) => handleProductChange('desiredMargin', value[0])}
                max={100}
                min={5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-slate-600 mt-2">
                <span>5%</span>
                <span className="font-semibold text-blue-600">{productData.desiredMargin}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operating Costs */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Fixed Operating Costs</CardTitle>
          <CardDescription>Monthly fixed expenses that affect your pricing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rent">Rent ($)</Label>
              <Input
                id="rent"
                type="number"
                value={operatingCosts.rent}
                onChange={(e) => handleOperatingChange('rent', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="utilities">Utilities ($)</Label>
              <Input
                id="utilities"
                type="number"
                value={operatingCosts.utilities}
                onChange={(e) => handleOperatingChange('utilities', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaries">Salaries ($)</Label>
              <Input
                id="salaries"
                type="number"
                value={operatingCosts.salaries}
                onChange={(e) => handleOperatingChange('salaries', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="other">Other Expenses ($)</Label>
              <Input
                id="other"
                type="number"
                value={operatingCosts.other}
                onChange={(e) => handleOperatingChange('other', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="bg-white/50"
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700">Total Monthly Fixed Costs:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${totalOperatingCosts.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
