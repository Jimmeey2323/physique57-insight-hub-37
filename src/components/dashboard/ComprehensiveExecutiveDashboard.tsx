
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  BarChart3, 
  Calendar, 
  Eye,
  Activity,
  UserCheck,
  Zap,
  ShoppingCart,
  TrendingDown,
  Percent,
  Clock
} from 'lucide-react';
import { ExecutiveFilters } from './ExecutiveFilters';
import { ExecutiveMetricCardsGrid } from './ExecutiveMetricCardsGrid';
import { ExecutiveChartsGrid } from './ExecutiveChartsGrid';
import { ExecutiveDataTablesGrid } from './ExecutiveDataTablesGrid';
import { ExecutiveTopPerformersGrid } from './ExecutiveTopPerformersGrid';
import { SourceDataModal } from '@/components/ui/SourceDataModal';
import { useGlobalFilters } from '@/contexts/GlobalFiltersContext';

export const ComprehensiveExecutiveDashboard = () => {
  const [showSourceData, setShowSourceData] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const { filters } = useGlobalFilters();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 p-6">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-700 rounded-3xl text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-10 w-24 h-24 bg-indigo-300/20 rounded-full animate-bounce delay-1000"></div>
            <div className="absolute bottom-10 left-20 w-40 h-40 bg-purple-300/10 rounded-full animate-pulse delay-500"></div>
          </div>
          
          <div className="relative p-12">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 animate-fade-in-up">
                <BarChart3 className="w-6 h-6" />
                <span className="font-semibold text-lg">Executive Dashboard</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent animate-fade-in-up delay-200">
                Executive Overview
              </h1>
              
              <p className="text-xl text-indigo-100 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-300">
                Comprehensive real-time insights across Sales, Leads, Sessions, Trainers, and Client Conversions - Previous Month Performance
              </p>
              
              <div className="flex items-center justify-center gap-4 animate-fade-in-up delay-400">
                <Badge className="bg-white/10 text-white border-white/20 px-4 py-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Previous Month Data
                </Badge>
                <Badge className="bg-green-500/20 text-green-100 border-green-400/30 px-4 py-2">
                  <Activity className="w-4 h-4 mr-2" />
                  Live Analytics
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Filters */}
        <ExecutiveFilters />

        {/* Key Performance Metrics - 12 Cards */}
        <ExecutiveMetricCardsGrid />

        {/* Interactive Charts Section - 4 Charts */}
        <ExecutiveChartsGrid />

        {/* Main Content Sections */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white border-0">
            <CardTitle className="text-2xl font-bold flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              Comprehensive Performance Analytics
              <Badge className="bg-white/20 text-white backdrop-blur-sm px-3 py-1">
                8+ Data Tables
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
              <TabsList className="bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-xl border-0 grid grid-cols-4 w-full max-w-4xl mx-auto overflow-hidden mb-8">
                <TabsTrigger 
                  value="overview" 
                  className="relative rounded-xl px-4 py-3 font-semibold text-sm transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Data Tables
                </TabsTrigger>
                <TabsTrigger 
                  value="performers" 
                  className="relative rounded-xl px-4 py-3 font-semibold text-sm transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Top Performers
                </TabsTrigger>
                <TabsTrigger 
                  value="trends" 
                  className="relative rounded-xl px-4 py-3 font-semibold text-sm transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Trend Analysis
                </TabsTrigger>
                <TabsTrigger 
                  value="insights" 
                  className="relative rounded-xl px-4 py-3 font-semibold text-sm transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Insights
                </TabsTrigger>
              </TabsList>

              <div className="space-y-6">
                <TabsContent value="overview" className="space-y-6 mt-0">
                  <ExecutiveDataTablesGrid />
                </TabsContent>

                <TabsContent value="performers" className="space-y-6 mt-0">
                  <ExecutiveTopPerformersGrid />
                </TabsContent>

                <TabsContent value="trends" className="space-y-6 mt-0">
                  <ExecutiveChartsGrid showTrends={true} />
                </TabsContent>

                <TabsContent value="insights" className="space-y-6 mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-blue-800">Key Performance Insights</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium">Revenue up 12.5% from last month</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                          <Users className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium">Member growth rate: 8.2%</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                          <Target className="w-5 h-5 text-purple-600" />
                          <span className="text-sm font-medium">Lead conversion improved by 3.1%</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
                      <CardHeader>
                        <CardTitle className="text-green-800">Action Items</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                          <Clock className="w-5 h-5 text-orange-600" />
                          <span className="text-sm font-medium">Focus on bottom 10% performers</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                          <TrendingDown className="w-5 h-5 text-red-600" />
                          <span className="text-sm font-medium">Investigate session no-show rates</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                          <Zap className="w-5 h-5 text-yellow-600" />
                          <span className="text-sm font-medium">Optimize PowerCycle class schedules</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Source Data Modal */}
        {showSourceData && (
          <SourceDataModal
            open={showSourceData}
            onOpenChange={setShowSourceData}
            sources={[
              {
                name: "Comprehensive Executive Data",
                data: []
              }
            ]}
          />
        )}
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};
