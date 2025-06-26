
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, MessageSquare } from "lucide-react";

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

interface ConversationalSurveyProps {
  onComplete: (data: SurveyData) => void;
}

export const ConversationalSurvey = ({ onComplete }: ConversationalSurveyProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    productName: '',
    category: '',
    unitCost: 0,
    targetAudience: '',
    monthlySalesVolume: 0,
    businessType: '',
    brandPositioning: '',
    desiredMargin: 25,
    competitors: ''
  });

  const questions = [
    {
      id: 'productName',
      question: "What's the name of your product or service?",
      type: 'text',
      placeholder: "e.g., Artisan Coffee Blend, Web Design Service",
      aiContext: "Understanding the product helps determine industry standards and positioning."
    },
    {
      id: 'category',
      question: "What category does your product fall into?",
      type: 'text',
      placeholder: "e.g., Food & Beverage, Technology, Fashion, Services",
      aiContext: "Category determines pricing benchmarks and market expectations."
    },
    {
      id: 'unitCost',
      question: "What's your cost per unit (production or purchase cost)?",
      type: 'number',
      placeholder: "Enter amount in dollars",
      aiContext: "Base cost is crucial for calculating minimum viable pricing."
    },
    {
      id: 'businessType',
      question: "What type of business are you running?",
      type: 'select',
      options: ['Retail Store', 'E-commerce', 'Service Provider', 'Manufacturing', 'Restaurant/Food', 'SaaS/Software', 'Other'],
      aiContext: "Business model affects pricing strategy and customer expectations."
    },
    {
      id: 'targetAudience',
      question: "Who is your target customer?",
      type: 'textarea',
      placeholder: "e.g., Young professionals aged 25-35, Small business owners, Budget-conscious families",
      aiContext: "Customer profile influences pricing sensitivity and positioning strategy."
    },
    {
      id: 'brandPositioning',
      question: "How do you want to position your brand?",
      type: 'select',
      options: ['Premium/Luxury', 'Mid-range/Quality', 'Budget/Value', 'Economy/Basic'],
      aiContext: "Brand positioning directly impacts pricing strategy and margins."
    },
    {
      id: 'monthlySalesVolume',
      question: "What's your estimated monthly sales volume (units)?",
      type: 'number',
      placeholder: "e.g., 100, 500, 1000",
      aiContext: "Volume helps calculate fixed cost distribution and economies of scale."
    },
    {
      id: 'desiredMargin',
      question: "What's your target profit margin percentage?",
      type: 'number',
      placeholder: "e.g., 25 for 25%",
      aiContext: "Desired margin helps balance profitability with competitiveness."
    },
    {
      id: 'competitors',
      question: "Who are your main competitors and their pricing (if known)?",
      type: 'textarea',
      placeholder: "e.g., Competitor A: $25, Competitor B: $30, Generic brands: $15-20",
      aiContext: "Competitive landscape is essential for positioning and market-based pricing."
    }
  ];

  const currentQuestion = questions[currentStep];

  const handleInputChange = (value: string | number) => {
    setSurveyData(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(surveyData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isCurrentStepValid = () => {
    const value = surveyData[currentQuestion.id as keyof SurveyData];
    if (currentQuestion.type === 'number') {
      return typeof value === 'number' && value > 0;
    }
    return value && value.toString().trim() !== '';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Pricing Survey
            </CardTitle>
          </div>
          <CardDescription>
            Let our AI understand your business to create the perfect pricing strategy
          </CardDescription>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-slate-600 mt-2">
            Question {currentStep + 1} of {questions.length}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-slate-800 mb-2">
              {currentQuestion.question}
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              {currentQuestion.aiContext}
            </p>

            {currentQuestion.type === 'text' && (
              <Input
                value={surveyData[currentQuestion.id as keyof SurveyData] as string}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="bg-white/70"
              />
            )}

            {currentQuestion.type === 'number' && (
              <Input
                type="number"
                value={surveyData[currentQuestion.id as keyof SurveyData] as number || ''}
                onChange={(e) => handleInputChange(parseFloat(e.target.value) || 0)}
                placeholder={currentQuestion.placeholder}
                className="bg-white/70"
              />
            )}

            {currentQuestion.type === 'textarea' && (
              <Textarea
                value={surveyData[currentQuestion.id as keyof SurveyData] as string}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="bg-white/70 min-h-[100px]"
              />
            )}

            {currentQuestion.type === 'select' && (
              <div className="grid grid-cols-2 gap-2">
                {currentQuestion.options?.map((option) => (
                  <Button
                    key={option}
                    variant={surveyData[currentQuestion.id as keyof SurveyData] === option ? "default" : "outline"}
                    onClick={() => handleInputChange(option)}
                    className="text-left justify-start"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>

            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index <= currentStep ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <Button 
              onClick={handleNext}
              disabled={!isCurrentStepValid()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {currentStep === questions.length - 1 ? 'Get AI Recommendations' : 'Next'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
