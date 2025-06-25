
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowLeft, TrendingUp, TrendingDown, Equal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompareMocks = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('score');
  const [mockData, setMockData] = useState<any[]>([]);

  // Generate sample mock data
  useEffect(() => {
    const sampleData = [
      { mock: 'Mock 1', score: 120, accuracy: 65, rank: 1200, percentile: 72 },
      { mock: 'Mock 2', score: 135, accuracy: 70, rank: 950, percentile: 78 },
      { mock: 'Mock 3', score: 145, accuracy: 75, rank: 800, percentile: 82 },
      { mock: 'Mock 4', score: 156, accuracy: 78, rank: 650, percentile: 85 },
    ];
    setMockData(sampleData);
  }, []);

  const getChartData = () => {
    switch (viewMode) {
      case 'accuracy':
        return mockData.map(d => ({ name: d.mock, value: d.accuracy, label: 'Accuracy %' }));
      case 'rank':
        return mockData.map(d => ({ name: d.mock, value: d.rank, label: 'Rank' }));
      case 'percentile':
        return mockData.map(d => ({ name: d.mock, value: d.percentile, label: 'Percentile' }));
      default:
        return mockData.map(d => ({ name: d.mock, value: d.score, label: 'Score' }));
    }
  };

  const getTrendIcon = () => {
    if (mockData.length < 2) return <Equal className="w-4 h-4" />;
    
    const latest = mockData[mockData.length - 1];
    const previous = mockData[mockData.length - 2];
    
    let currentValue, previousValue;
    
    switch (viewMode) {
      case 'accuracy':
        currentValue = latest.accuracy;
        previousValue = previous.accuracy;
        break;
      case 'rank':
        currentValue = latest.rank;
        previousValue = previous.rank;
        // For rank, lower is better
        return currentValue < previousValue ? 
          <TrendingUp className="w-4 h-4 text-green-500" /> : 
          <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'percentile':
        currentValue = latest.percentile;
        previousValue = previous.percentile;
        break;
      default:
        currentValue = latest.score;
        previousValue = previous.score;
    }
    
    return currentValue > previousValue ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> : 
      <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const chartData = getChartData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/pts-report-card')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Report Card
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Compare Mock Performance</h1>
            <p className="text-gray-600">Track your progress across multiple mock tests</p>
          </div>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">View Mode:</label>
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Score over time</SelectItem>
                  <SelectItem value="accuracy">Accuracy per subject</SelectItem>
                  <SelectItem value="rank">Rank vs Percentile</SelectItem>
                  <SelectItem value="percentile">Percentile Progress</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-600">Trend:</span>
                {getTrendIcon()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                {viewMode === 'rank' ? (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name={chartData[0]?.label || 'Value'} />
                  </BarChart>
                ) : (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8884d8" 
                      strokeWidth={3}
                      name={chartData[0]?.label || 'Value'}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-700">Latest Score</h3>
              <p className="text-2xl font-bold text-blue-600">{mockData[mockData.length - 1]?.score || 0}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-700">Best Score</h3>
              <p className="text-2xl font-bold text-green-600">
                {Math.max(...mockData.map(d => d.score))}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-700">Best Rank</h3>
              <p className="text-2xl font-bold text-purple-600">
                #{Math.min(...mockData.map(d => d.rank))}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-700">Improvement</h3>
              <p className="text-2xl font-bold text-orange-600">
                +{mockData.length > 1 ? 
                  (mockData[mockData.length - 1].score - mockData[0].score) : 0} pts
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompareMocks;
