
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Target, Activity, DollarSign } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

interface ExecutiveChartsGridProps {
  showTrends?: boolean;
}

export const ExecutiveChartsGrid: React.FC<ExecutiveChartsGridProps> = ({ showTrends = false }) => {
  const revenueData = [
    { month: 'Week 1', revenue: 45000, members: 180, sessions: 120 },
    { month: 'Week 2', revenue: 52000, members: 195, sessions: 135 },
    { month: 'Week 3', revenue: 48000, members: 188, sessions: 128 },
    { month: 'Week 4', revenue: 58000, members: 210, sessions: 145 }
  ];

  const conversionData = [
    { source: 'Website', leads: 150, conversions: 35, rate: 23.3 },
    { source: 'Referral', leads: 89, conversions: 28, rate: 31.5 },
    { source: 'Social Media', leads: 120, conversions: 22, rate: 18.3 },
    { source: 'Walk-in', leads: 67, conversions: 19, rate: 28.4 },
    { source: 'Google Ads', leads: 95, conversions: 17, rate: 17.9 }
  ];

  const sessionTypeData = [
    { name: 'PowerCycle', value: 342, color: '#8B5CF6' },
    { name: 'Barre', value: 287, color: '#06B6D4' },
    { name: 'HIIT', value: 156, color: '#10B981' },
    { name: 'Yoga', value: 98, color: '#F59E0B' }
  ];

  const trainerPerformance = [
    { trainer: 'Sarah M.', revenue: 45230, sessions: 68, rating: 4.9 },
    { trainer: 'Mike R.', revenue: 42150, sessions: 72, rating: 4.8 },
    { trainer: 'Lisa K.', revenue: 38970, sessions: 65, rating: 4.7 },
    { trainer: 'John D.', revenue: 36540, sessions: 69, rating: 4.6 },
    { trainer: 'Emma W.', revenue: 34120, sessions: 58, rating: 4.8 }
  ];

  const COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          {showTrends ? 'Performance Trends' : 'Business Analytics Charts'}
        </h2>
        <p className="text-slate-600">Visual insights into key performance areas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue & Members Trend */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Revenue & Member Growth
              <Badge className="bg-white/20 text-white">Weekly</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.6}
                  name="Revenue ($)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="members"
                  stroke="#06B6D4"
                  strokeWidth={3}
                  name="New Members"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Conversion by Source */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Lead Conversion by Source
              <Badge className="bg-white/20 text-white">Previous Month</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="source" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="leads" fill="#94A3B8" name="Total Leads" />
                <Bar dataKey="conversions" fill="#10B981" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Session Type Distribution */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Session Type Distribution
              <Badge className="bg-white/20 text-white">Previous Month</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sessionTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sessionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Trainer Performance */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Top Trainer Revenue
              <Badge className="bg-white/20 text-white">Top 5</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trainerPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="trainer" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#F59E0B" name="Revenue ($)" />
                <Bar dataKey="sessions" fill="#8B5CF6" name="Sessions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
