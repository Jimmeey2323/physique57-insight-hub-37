
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  Zap
} from 'lucide-react';
import { ExecutiveFilters } from './ExecutiveFilters';
import { ExecutivePowerCycleVsBarreMetrics } from './ExecutivePowerCycleVsBarreMetrics';
import { SourceDataModal } from '@/components/ui/SourceDataModal';

// Import table components from each section
import { MonthOnMonthTable } from './MonthOnMonthTable';
import { TopBottomSellers } from './TopBottomSellers';
import { LeadMonthOnMonthTable } from './LeadMonthOnMonthTable';
import { SessionsTopBottomLists } from './SessionsTopBottomLists';
import { PowerCycleVsBarreEnhancedMonthOnMonthTable } from './PowerCycleVsBarreEnhancedMonthOnMonthTable';
import { TrainerDetailedPerformanceTable } from './TrainerDetailedPerformanceTable';

export const ExecutiveSummarySection = () => {
  const [showSourceData, setShowSourceData] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
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
                Executive Summary
              </h1>
              
              <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-300">
                Comprehensive overview of business performance across all key metrics and departments
              </p>
            </div>
          </div>
        </div>

        {/* Executive Filters */}
        <ExecutiveFilters />

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Revenue',
              value: '$47,235',
              change: '+12.5%',
              icon: DollarSign,
              color: 'from-green-500 to-emerald-600'
            },
            {
              title: 'Active Members',
              value: '2,847',
              change: '+8.2%',
              icon: Users,
              color: 'from-blue-500 to-cyan-600'
            },
            {
              title: 'Session Attendance',
              value: '1,234',
              change: '+15.3%',
              icon: Activity,
              color: 'from-purple-500 to-violet-600'
            },
            {
              title: 'Lead Conversion',
              value: '23.5%',
              change: '+3.1%',
              icon: Target,
              color: 'from-orange-500 to-red-600'
            }
          ].map((metric, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200 transition-colors">
                    {metric.change}
                  </Badge>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-2">{metric.title}</h3>
                <p className="text-3xl font-bold text-slate-900">{metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* PowerCycle vs Barre Metrics */}
        <ExecutivePowerCycleVsBarreMetrics />

        {/* Main Content Tabs */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white border-0">
            <CardTitle className="text-2xl font-bold flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              Department Performance Overview
              <Badge className="bg-white/20 text-white backdrop-blur-sm px-3 py-1">
                Previous Month Data
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-xl border-0 grid grid-cols-6 w-full max-w-6xl mx-auto overflow-hidden mb-8">
                <TabsTrigger 
                  value="overview" 
                  className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Sales Performance
                </TabsTrigger>
                <TabsTrigger 
                  value="leads" 
                  className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Lead Analytics
                </TabsTrigger>
                <TabsTrigger 
                  value="sessions" 
                  className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Session Metrics
                </TabsTrigger>
                <TabsTrigger 
                  value="powercycle" 
                  className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  PowerCycle vs Barre
                </TabsTrigger>
                <TabsTrigger 
                  value="trainers" 
                  className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Trainer Performance
                </TabsTrigger>
                <TabsTrigger 
                  value="monthly" 
                  className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Monthly Trends
                </TabsTrigger>
              </TabsList>

              <div className="space-y-6">
                <TabsContent value="overview" className="space-y-6 mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-white shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-slate-800">
                          Top & Bottom Sellers
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <TopBottomSellers />
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-slate-800">
                          Sales Month-on-Month Trends
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <MonthOnMonthTable />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="leads" className="space-y-6 mt-0">
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-800">
                        Lead Performance Month-on-Month
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <LeadMonthOnMonthTable />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="sessions" className="space-y-6 mt-0">
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-800">
                        Session Performance Rankings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SessionsTopBottomLists />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="powercycle" className="space-y-6 mt-0">
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-800">
                        PowerCycle vs Barre Month-on-Month Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PowerCycleVsBarreEnhancedMonthOnMonthTable 
                        onRowClick={() => {}}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="trainers" className="space-y-6 mt-0">
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-800">
                        Trainer Performance Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <TrainerDetailedPerformanceTable />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="monthly" className="space-y-6 mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-white shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-slate-800">
                          Revenue Trends
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <MonthOnMonthTable />
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-slate-800">
                          Lead Generation Trends
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <LeadMonthOnMonthTable />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Source Data Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShowSourceData(true)}
            className="gap-2 shadow-lg hover:shadow-xl transition-shadow bg-white"
          >
            <Eye className="w-4 h-4" />
            View All Source Data
          </Button>
        </div>

        {/* Source Data Modal */}
        {showSourceData && (
          <SourceDataModal
            open={showSourceData}
            onOpenChange={setShowSourceData}
            sources={[
              {
                name: "Executive Summary Data",
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
      `}</style>
    </div>
  );
};
