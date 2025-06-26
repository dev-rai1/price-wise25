
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Target, TrendingUp, Shield } from "lucide-react";

interface SurveyData {
  productName: string;
  category: string;
  unitCost: number;
  targetAudience: string;
  monthlySalesVolume: number;
  businessType: string;
  brandPositioning: string;
  desiredMargin: number;
  competitors: string;
}

interface PricingStrategy {
  name: string;
  price: number;
  margin: number;
  reasoning: string;
  pros: string[];
  cons: string[];
  icon: React.ReactNode;
  color: string;
}

interface AIPricingEngineProps {
  surveyData: SurveyData;
  onStartOver: () => void;
}

export const AIPricingEngine = ({ surveyData, onStartOver }: AIPricingEngineProps) => {
  // AI Pricing Logic
  const calculatePricing = (): PricingStrategy[] => {
    const { unitCost, desiredMargin, brandPositioning, businessType, category } = surveyData;
    
    // Base calculations
    const basePrice = unitCost / (1 - desiredMargin / 100);
    
    // Industry and positioning adjustments
    const positioningMultiplier = {
      'Premium/Luxury': 1.4,
      'Mid-range/Quality': 1.1,
      'Budget/Value': 0.9,
      'Economy/Basic': 0.8
    }[brandPositioning] || 1.0;

    const businessTypeMultiplier = {
      'SaaS/Software': 1.3,
      'Service Provider': 1.2,
      'E-commerce': 1.0,
      'Retail Store': 1.1,
      'Manufacturing': 0.95,
      'Restaurant/Food': 1.05,
      'Other': 1.0
    }[businessType] || 1.0;

    const adjustedBasePrice = basePrice * positioningMultiplier * businessTypeMultiplier;

    // Generate three strategies
    return [
      {
        name: 'Conservative',
        price: adjustedBasePrice * 1.15,
        margin: ((adjustedBasePrice * 1.15 - unitCost) / (adjustedBasePrice * 1.15)) * 100,
        reasoning: `Higher margin strategy focusing on profitability and sustainable growth. Based on your ${brandPositioning.toLowerCase()} positioning and ${businessType.toLowerCase()} business model.`,
        pros: ['Higher profit per unit', 'Sustainable margins', 'Premium perception', 'Lower volume risk'],
        cons: ['Slower market penetration', 'Higher price sensitivity', 'Limited volume growth'],
        icon: <Shield className="h-5 w-5" />,
        color: 'from-green-500 to-emerald-600'
      },
      {
        name: 'Balanced',
        price: adjustedBasePrice,
        margin: ((adjustedBasePrice - unitCost) / adjustedBasePrice) * 100,
        reasoning: `Optimal balance between profitability and competitiveness. Aligned with your target ${desiredMargin}% margin and market positioning.`,
        pros: ['Market-competitive pricing', 'Balanced growth', 'Reasonable margins', 'Flexible positioning'],
        cons: ['Moderate growth rate', 'Average market position', 'Margin pressure risk'],
        icon: <Target className="h-5 w-5" />,
        color: 'from-blue-500 to-indigo-600'
      },
      {
        name: 'Aggressive',
        price: adjustedBasePrice * 0.85,
        margin: ((adjustedBasePrice * 0.85 - unitCost) / (adjustedBasePrice * 0.85)) * 100,
        reasoning: `Market penetration strategy for rapid customer acquisition. Optimized for volume growth in the ${category.toLowerCase()} category.`,
        pros: ['Fast market penetration', 'High volume potential', 'Competitive advantage', 'Customer acquisition'],
        cons: ['Lower profit margins', 'Sustainability concerns', 'Price war risk'],
        icon: <TrendingUp className="h-5 w-5" />,
        color: 'from-orange-500 to-red-600'
      }
    ];
  };

  const strategies = calculatePricing();
  const breakEvenUnits = Math.ceil(1000 / ((strategies[1].price - surveyData.unitCost) || 1)); // Assuming $1000 fixed costs

  return (
    <div className="space-y-8">
      {/* AI Analysis Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0 shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-purple-600" />
            <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Pricing Analysis
            </CardTitle>
          </div>
          <CardDescription className="text-lg">
            Based on your {surveyData.productName} in the {surveyData.category} market
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/60 rounded-lg">
              <p className="text-sm text-slate-600">Product Cost</p>
              <p className="text-2xl font-bold text-slate-800">${surveyData.unitCost.toFixed(2)}</p>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-lg">
              <p className="text-sm text-slate-600">Target Margin</p>
              <p className="text-2xl font-bold text-slate-800">{surveyData.desiredMargin}%</p>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-lg">
              <p className="text-sm text-slate-600">Break-even Units</p>
              <p className="text-2xl font-bold text-slate-800">{breakEvenUnits}/month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Strategies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {strategies.map((strategy, index) => (
          <Card key={strategy.name} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <div className={`flex items-center space-x-2 mb-2`}>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${strategy.color} text-white`}>
                  {strategy.icon}
                </div>
                <CardTitle className="text-xl">{strategy.name} Strategy</CardTitle>
              </div>
              <div className="text-center py-4">
                <p className="text-4xl font-bold bg-gradient-to-r ${strategy.color} bg-clip-text text-transparent">
                  ${strategy.price.toFixed(2)}
                </p>
                <Badge variant="secondary" className="mt-2">
                  {strategy.margin.toFixed(1)}% Margin
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                {strategy.reasoning}
              </p>
              
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Advantages</h4>
                <ul className="text-sm space-y-1">
                  {strategy.pros.map((pro, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Considerations</h4>
                <ul className="text-sm space-y-1">
                  {strategy.cons.map((con, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Context */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle>Market Context & Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Business Profile Analysis</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Business Type:</span> {surveyData.businessType}</p>
                <p><span className="font-medium">Brand Position:</span> {surveyData.brandPositioning}</p>
                <p><span className="font-medium">Target Volume:</span> {surveyData.monthlySalesVolume} units/month</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">AI Recommendations</h4>
              <div className="text-sm space-y-2">
                {surveyData.brandPositioning.includes('Premium') && (
                  <p className="text-green-700">✓ Conservative strategy aligns with premium positioning</p>
                )}
                {surveyData.monthlySalesVolume < 100 && (
                  <p className="text-blue-700">→ Consider balanced approach for sustainable growth</p>
                )}
                {surveyData.competitors.toLowerCase().includes('$') && (
                  <p className="text-orange-700">⚠ Monitor competitor pricing closely</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-2">Competitive Intelligence</h4>
            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
              <span className="font-medium">Competitor Analysis:</span> {surveyData.competitors || 'No specific competitor data provided'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button onClick={onStartOver} variant="outline" size="lg">
          Analyze Another Product
        </Button>
        <Button 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          size="lg"
          onClick={() => window.print()}
        >
          Download Report
        </Button>
      </div>
    </div>
  );
};
