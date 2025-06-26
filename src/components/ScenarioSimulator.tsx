
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface ScenarioSimulatorProps {
  productData: {
    name: string;
    baseCost: number;
    desiredMargin: number;
    sku: string;
  };
  operatingCosts: {
    rent: number;
    utilities: number;
    salaries: number;
    other: number;
  };
}

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({
  productData,
  operatingCosts
}) => {
  const [scenarios, setScenarios] = useState({
    costMultiplier: 1,
    marginMultiplier: 1,
    rentMultiplier: 1,
    volumeEstimate: 100
  });

  const [results, setResults] = useState({
    newPrice: 0,
    profitPerUnit: 0,
    monthlyProfit: 0,
    breakEvenUnits: 0
  });

  useEffect(() => {
    const adjustedBaseCost = productData.baseCost * scenarios.costMultiplier;
    const adjustedMargin = productData.desiredMargin * scenarios.marginMultiplier;
    const adjustedRent = operatingCosts.rent * scenarios.rentMultiplier;
    const totalFixedCosts = adjustedRent + operatingCosts.utilities + operatingCosts.salaries + operatingCosts.other;
    
    const newPrice = adjustedBaseCost * (1 + adjustedMargin / 100);
    const profitPerUnit = newPrice - adjustedBaseCost;
    const monthlyProfit = (profitPerUnit * scenarios.volumeEstimate) - totalFixedCosts;
    const breakEvenUnits = totalFixedCosts / profitPerUnit;

    setResults({
      newPrice: newPrice,
      profitPerUnit: profitPerUnit,
      monthlyProfit: monthlyProfit,
      breakEvenUnits: breakEvenUnits
    });
  }, [scenarios, productData, operatingCosts]);

  const updateScenario = (key: string, value: number) => {
    setScenarios(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Scenario Controls */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Scenario Simulator</CardTitle>
          <CardDescription>Adjust variables to see real-time impact on pricing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Cost Change Factor</Label>
              <div className="px-4 mt-2">
                <Slider
                  value={[scenarios.costMultiplier]}
                  onValueChange={(value) => updateScenario('costMultiplier', value[0])}
                  max={2}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-600 mt-2">
                  <span>-50%</span>
                  <Badge variant="outline" className="px-2 py-1">
                    {((scenarios.costMultiplier - 1) * 100).toFixed(0)}%
                  </Badge>
                  <span>+100%</span>
                </div>
              </div>
            </div>

            <div>
              <Label>Margin Adjustment</Label>
              <div className="px-4 mt-2">
                <Slider
                  value={[scenarios.marginMultiplier]}
                  onValueChange={(value) => updateScenario('marginMultiplier', value[0])}
                  max={2}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-600 mt-2">
                  <span>-50%</span>
                  <Badge variant="outline" className="px-2 py-1">
                    {((scenarios.marginMultiplier - 1) * 100).toFixed(0)}%
                  </Badge>
                  <span>+100%</span>
                </div>
              </div>
            </div>

            <div>
              <Label>Rent Change</Label>
              <div className="px-4 mt-2">
                <Slider
                  value={[scenarios.rentMultiplier]}
                  onValueChange={(value) => updateScenario('rentMultiplier', value[0])}
                  max={2}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-600 mt-2">
                  <span>-50%</span>
                  <Badge variant="outline" className="px-2 py-1">
                    {((scenarios.rentMultiplier - 1) * 100).toFixed(0)}%
                  </Badge>
                  <span>+100%</span>
                </div>
              </div>
            </div>

            <div>
              <Label>Monthly Sales Volume</Label>
              <div className="px-4 mt-2">
                <Slider
                  value={[scenarios.volumeEstimate]}
                  onValueChange={(value) => updateScenario('volumeEstimate', value[0])}
                  max={1000}
                  min={10}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-600 mt-2">
                  <span>10 units</span>
                  <Badge variant="outline" className="px-2 py-1">
                    {scenarios.volumeEstimate} units
                  </Badge>
                  <span>1000 units</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Scenario Results</CardTitle>
          <CardDescription>See the impact of your adjustments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <p className="text-sm text-blue-600 font-medium">New Price</p>
              <p className="text-2xl font-bold text-blue-800">${results.newPrice.toFixed(2)}</p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <p className="text-sm text-green-600 font-medium">Profit per Unit</p>
              <p className="text-2xl font-bold text-green-800">${results.profitPerUnit.toFixed(2)}</p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
              <p className="text-sm text-purple-600 font-medium">Monthly Profit</p>
              <p className={`text-2xl font-bold ${results.monthlyProfit >= 0 ? 'text-purple-800' : 'text-red-600'}`}>
                ${results.monthlyProfit.toFixed(2)}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200">
              <p className="text-sm text-orange-600 font-medium">Break-even Units</p>
              <p className="text-2xl font-bold text-orange-800">
                {isFinite(results.breakEvenUnits) ? Math.ceil(results.breakEvenUnits) : '∞'}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h4 className="font-semibold text-slate-700 mb-3">Scenario Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Adjusted Base Cost:</span>
                <span className="font-medium">${(productData.baseCost * scenarios.costMultiplier).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Adjusted Margin:</span>
                <span className="font-medium">{(productData.desiredMargin * scenarios.marginMultiplier).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Adjusted Rent:</span>
                <span className="font-medium">${(operatingCosts.rent * scenarios.rentMultiplier).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {results.monthlyProfit < 0 && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-600 font-medium">⚠️ Warning</p>
              <p className="text-sm text-red-600">
                Current scenario results in negative monthly profit. Consider adjusting pricing or reducing costs.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
