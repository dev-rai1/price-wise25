
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PricingCalculator } from "@/components/PricingCalculator";
import { CompetitorAnalysis } from "@/components/CompetitorAnalysis";
import { ProfitChart } from "@/components/ProfitChart";
import { ScenarioSimulator } from "@/components/ScenarioSimulator";

const Index = () => {
  const [productData, setProductData] = useState({
    name: '',
    baseCost: 0,
    desiredMargin: 25,
    sku: ''
  });

  const [operatingCosts, setOperatingCosts] = useState({
    rent: 0,
    utilities: 0,
    salaries: 0,
    other: 0
  });

  const calculatePricing = () => {
    const totalFixedCosts = Object.values(operatingCosts).reduce((sum, cost) => sum + cost, 0);
    const marginMultiplier = productData.desiredMargin / 100;
    
    return {
      conservative: productData.baseCost * (1 + marginMultiplier + 0.1),
      balanced: productData.baseCost * (1 + marginMultiplier),
      aggressive: productData.baseCost * (1 + marginMultiplier - 0.05)
    };
  };

  const pricingStrategies = calculatePricing();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PW</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PriceWise
              </h1>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Get Started Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-slate-800 mb-6">
            Optimize Your Pricing
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Maximize Your Profits
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            PriceWise helps small businesses make data-driven pricing decisions with competitor analysis, 
            profit optimization, and real-time scenario planning.
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              📊 Smart Analytics
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              🎯 Competitor Insights
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              💰 Profit Optimization
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 pb-12">
        <Tabs defaultValue="calculator" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="calculator">Pricing Calculator</TabsTrigger>
            <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
            <TabsTrigger value="visualization">Profit Visualization</TabsTrigger>
            <TabsTrigger value="simulator">Scenario Simulator</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PricingCalculator 
                productData={productData}
                setProductData={setProductData}
                operatingCosts={operatingCosts}
                setOperatingCosts={setOperatingCosts}
              />
              
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800">Pricing Strategies</CardTitle>
                  <CardDescription>Compare different pricing approaches</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                      <div>
                        <h4 className="font-semibold text-green-800">Conservative</h4>
                        <p className="text-sm text-green-600">Higher margins, premium positioning</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-800">
                          ${pricingStrategies.conservative.toFixed(2)}
                        </p>
                        <p className="text-sm text-green-600">
                          {((pricingStrategies.conservative - productData.baseCost) / productData.baseCost * 100).toFixed(1)}% margin
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                      <div>
                        <h4 className="font-semibold text-blue-800">Balanced</h4>
                        <p className="text-sm text-blue-600">Optimal profit-competitiveness balance</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-800">
                          ${pricingStrategies.balanced.toFixed(2)}
                        </p>
                        <p className="text-sm text-blue-600">
                          {productData.desiredMargin}% margin
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
                      <div>
                        <h4 className="font-semibold text-orange-800">Aggressive</h4>
                        <p className="text-sm text-orange-600">Market penetration focused</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-800">
                          ${pricingStrategies.aggressive.toFixed(2)}
                        </p>
                        <p className="text-sm text-orange-600">
                          {((pricingStrategies.aggressive - productData.baseCost) / productData.baseCost * 100).toFixed(1)}% margin
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="competitors">
            <CompetitorAnalysis />
          </TabsContent>

          <TabsContent value="visualization">
            <ProfitChart 
              productData={productData}
              pricingStrategies={pricingStrategies}
              operatingCosts={operatingCosts}
            />
          </TabsContent>

          <TabsContent value="simulator">
            <ScenarioSimulator 
              productData={productData}
              operatingCosts={operatingCosts}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
