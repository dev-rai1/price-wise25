
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConversationalSurvey } from "@/components/ConversationalSurvey";
import { AIPricingEngine } from "@/components/AIPricingEngine";

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

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'survey' | 'results'>('landing');
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);

  const handleSurveyComplete = (data: SurveyData) => {
    setSurveyData(data);
    setCurrentView('results');
  };

  const handleStartOver = () => {
    setSurveyData(null);
    setCurrentView('landing');
  };

  const handleStartSurvey = () => {
    setCurrentView('survey');
  };

  if (currentView === 'survey') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="container mx-auto px-6">
          <ConversationalSurvey onComplete={handleSurveyComplete} />
        </div>
      </div>
    );
  }

  if (currentView === 'results' && surveyData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="container mx-auto px-6">
          <AIPricingEngine surveyData={surveyData} onStartOver={handleStartOver} />
        </div>
      </div>
    );
  }

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
                PriceWise AI
              </h1>
            </div>
            <Button 
              onClick={handleStartSurvey}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Start Free Analysis
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-slate-800 mb-6">
            AI-Powered Pricing
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Made Simple
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Get intelligent pricing recommendations in minutes. Our AI analyzes your business, 
            competitors, and market positioning to suggest optimal pricing strategies.
          </p>
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              🤖 AI-Powered Analysis
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              📋 Conversational Survey
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              🎯 Tailored Strategies
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              📊 Instant Results
            </Badge>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-12">
            How PriceWise AI Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Answer Smart Questions</h4>
              <p className="text-slate-600">
                Our AI guides you through a conversational survey about your product, 
                business, and market. No complex forms or technical jargon.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">AI Analyzes Your Market</h4>
              <p className="text-slate-600">
                Advanced algorithms process your data against industry benchmarks, 
                competitor analysis, and proven pricing strategies.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Get Tailored Strategies</h4>
              <p className="text-slate-600">
                Receive three personalized pricing strategies with detailed reasoning, 
                pros and cons, and implementation guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-12 bg-white/50 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-slate-800 mb-8">
            Perfect for Small Businesses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-left">
              <h4 className="text-lg font-semibold mb-3">✨ No Expertise Required</h4>
              <p className="text-slate-600 mb-4">
                Skip complex pricing theory. Our AI handles the calculations and provides 
                clear, actionable recommendations.
              </p>
            </div>
            <div className="text-left">
              <h4 className="text-lg font-semibold mb-3">⚡ Instant Results</h4>
              <p className="text-slate-600 mb-4">
                Get professional pricing analysis in minutes, not days. 
                No waiting for consultants or lengthy research.
              </p>
            </div>
            <div className="text-left">
              <h4 className="text-lg font-semibold mb-3">🎯 Three Strategic Options</h4>
              <p className="text-slate-600 mb-4">
                Conservative, Balanced, and Aggressive strategies give you flexibility 
                to choose based on your business goals.
              </p>
            </div>
            <div className="text-left">
              <h4 className="text-lg font-semibold mb-3">📱 Mobile Friendly</h4>
              <p className="text-slate-600">
                Complete the analysis anywhere, anytime. Fully responsive design 
                works perfectly on all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h3 className="text-4xl font-bold text-slate-800 mb-6">
          Ready to Optimize Your Pricing?
        </h3>
        <p className="text-xl text-slate-600 mb-8">
          Join thousands of small businesses using AI to price smarter and grow faster.
        </p>
        <Button 
          onClick={handleStartSurvey}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-3"
        >
          Start Your Free Analysis Now
        </Button>
        <p className="text-sm text-slate-500 mt-4">
          No signup required • Get results instantly • 100% free
        </p>
      </section>
    </div>
  );
};

export default Index;
