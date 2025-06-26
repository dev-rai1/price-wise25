
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

interface Competitor {
  id: string;
  name: string;
  price: number;
  features: string;
}

export const CompetitorAnalysis = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { id: '1', name: 'Competitor A', price: 29.99, features: 'Basic features' },
    { id: '2', name: 'Competitor B', price: 39.99, features: 'Premium features' },
  ]);

  const [newCompetitor, setNewCompetitor] = useState({
    name: '',
    price: 0,
    features: ''
  });

  const addCompetitor = () => {
    if (!newCompetitor.name || !newCompetitor.price) return;
    
    const competitor: Competitor = {
      id: Date.now().toString(),
      ...newCompetitor
    };
    
    setCompetitors([...competitors, competitor]);
    setNewCompetitor({ name: '', price: 0, features: '' });
  };

  const removeCompetitor = (id: string) => {
    setCompetitors(competitors.filter(c => c.id !== id));
  };

  const averagePrice = competitors.length > 0 
    ? competitors.reduce((sum, comp) => sum + comp.price, 0) / competitors.length 
    : 0;

  const lowestPrice = competitors.length > 0 
    ? Math.min(...competitors.map(c => c.price)) 
    : 0;

  const highestPrice = competitors.length > 0 
    ? Math.max(...competitors.map(c => c.price)) 
    : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Add Competitor */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Add Competitor</CardTitle>
          <CardDescription>Track your competition's pricing strategy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="competitorName">Competitor Name</Label>
            <Input
              id="competitorName"
              value={newCompetitor.name}
              onChange={(e) => setNewCompetitor(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter competitor name"
              className="bg-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="competitorPrice">Price ($)</Label>
            <Input
              id="competitorPrice"
              type="number"
              value={newCompetitor.price}
              onChange={(e) => setNewCompetitor(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              placeholder="0.00"
              className="bg-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="competitorFeatures">Key Features</Label>
            <Input
              id="competitorFeatures"
              value={newCompetitor.features}
              onChange={(e) => setNewCompetitor(prev => ({ ...prev, features: e.target.value }))}
              placeholder="Brief description of features"
              className="bg-white/50"
            />
          </div>

          <Button 
            onClick={addCompetitor}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Add Competitor
          </Button>
        </CardContent>
      </Card>

      {/* Market Analysis */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Market Analysis</CardTitle>
          <CardDescription>Competitive pricing insights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
              <p className="text-sm text-slate-600">Lowest Price</p>
              <p className="text-2xl font-bold text-green-600">${lowestPrice.toFixed(2)}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <p className="text-sm text-slate-600">Average Price</p>
              <p className="text-2xl font-bold text-blue-600">${averagePrice.toFixed(2)}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50">
              <p className="text-sm text-slate-600">Highest Price</p>
              <p className="text-2xl font-bold text-orange-600">${highestPrice.toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-slate-700">Competitors</h4>
            {competitors.map((competitor) => (
              <div key={competitor.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-slate-800">{competitor.name}</span>
                    <Badge variant="secondary">${competitor.price}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{competitor.features}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCompetitor(competitor.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
