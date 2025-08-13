import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target,
  Activity,
  Calendar,
  Filter
} from 'lucide-react';
import { PowerCycleVsBarreEnhancedFilterSection } from './PowerCycleVsBarreEnhancedFilterSection';
import { PowerCycleVsBarreMetricCards } from './PowerCycleVsBarreMetricCards';
import { PowerCycleVsBarreCharts } from './PowerCycleVsBarreCharts';
import { PowerCycleVsBarreTables } from './PowerCycleVsBarreTables';
import { PowerCycleVsBarreTopBottomLists } from './PowerCycleVsBarreTopBottomLists';
import { PowerCycleVsBarreAdvancedMetrics } from './PowerCycleVsBarreAdvancedMetrics';
import { PowerCycleVsBarreComparison } from './PowerCycleVsBarreComparison';
import { SourceDataModal } from '@/components/ui/SourceDataModal';
import { useSessionsData } from '@/hooks/useSessionsData';
import { useFilteredSessionsData } from '@/hooks/useFilteredSessionsData';
import { SessionsFiltersProvider } from '@/contexts/SessionsFiltersContext';
import { SessionData as HookSessionData } from '@/hooks/useSessionsData';
import { SessionData as DashboardSessionData } from '@/types/dashboard';

// Transform function to convert hook SessionData to dashboard SessionData
const transformSessionData = (hookData: HookSessionData[]): DashboardSessionData[] => {
  return hookData.map(session => ({
    sessionId: session.sessionId || '',
    date: session.date || '',
    time: session.time || '',
    classType: session.classType || '',
    cleanedClass: session.cleanedClass || '',
    instructor: session.trainerName || '', // Map trainerName to instructor
    location: session.location || '',
    capacity: session.capacity || 0,
    booked: session.booked || 0, // Use booked if available, fallback to checkedInCount
    checkedIn: session.checkedInCount || 0, // Map checkedInCount to checkedIn
    checkedInCount: session.checkedInCount || 0,
    waitlisted: session.waitlist || 0, // Map waitlist to waitlisted
    waitlist: session.waitlist || 0,
    noShows: session.noShows || 0,
    fillPercentage: session.fillPercentage || 0,
    sessionCount: session.sessionCount || 0,
    totalAttendees: session.totalAttendees || session.checkedInCount || 0
  }));
};

const PowerCycleVsBarreSection = () => {
  const [activeTab, setActiveTab] = useState('metrics');
  const [showSourceData, setShowSourceData] = useState(false);
  const { data: sessionsData, loading, error } = useSessionsData();
  
  // Use filtered data
  const filteredData = useFilteredSessionsData(sessionsData || []);
  
  // Transform to dashboard format for components that need it
  const transformedData = useMemo(() => transformSessionData(filteredData), [filteredData]);
  
  // Filter PowerCycle and Barre sessions
  const powerCycleData = useMemo(() => {
    return filteredData.filter(session => {
      const className = session.cleanedClass?.toLowerCase() || '';
      return className.includes('cycle') || className.includes('power');
    });
  }, [filteredData]);

  const barreData = useMemo(() => {
    return filteredData.filter(session => {
      const className = session.cleanedClass?.toLowerCase() || '';
      return className.includes('barre');
    });
  }, [filteredData]);

  // Transform for components that need dashboard format
  const transformedPowerCycleData = useMemo(() => transformSessionData(powerCycleData), [powerCycleData]);
  const transformedBarreData = useMemo(() => transformSessionData(barreData), [barreData]);

  const handleItemClick = (item: any) => {
    console.log('Clicked item:', item);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-slate-600">Loading PowerCycle vs Barre Analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-600">Error loading data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 p-6">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-blue-800 to-indigo-700 rounded-3xl text-white shadow-2xl">
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
                <Zap className="w-6 h-6" />
                <span className="font-semibold text-lg">PowerCycle vs Barre</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-fade-in-up delay-200">
                Format Performance Analytics
              </h1>
              
              <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-300">
                Comprehensive insights into PowerCycle and Barre sessions, including attendance, fill rates, and more.
              </p>
              
              <div className="flex items-center justify-center gap-4 animate-fade-in-up delay-400">
                <Badge className="bg-white/10 text-white border-white/20 px-4 py-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Real-Time Data
                </Badge>
                <Badge className="bg-green-500/20 text-green-100 border-green-400/30 px-4 py-2">
                  <Activity className="w-4 h-4 mr-2" />
                  Live Analytics
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-100 border-blue-400/30 px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  {filteredData.length} Sessions
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Section */}
        <PowerCycleVsBarreEnhancedFilterSection data={filteredData} />

        {/* Key Metrics Overview */}
        <PowerCycleVsBarreMetricCards 
          powerCycleData={transformedPowerCycleData}
          barreData={transformedBarreData}
        />

        {/* Main Content Tabs */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white border-0">
            <CardTitle className="text-2xl font-bold flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              PowerCycle vs Barre Analytics
              <Badge className="bg-white/20 text-white backdrop-blur-sm px-3 py-1">
                {filteredData.length} Sessions Analyzed
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-xl border-0 grid grid-cols-5 w-full max-w-5xl mx-auto overflow-hidden mb-8">
                <TabsTrigger 
                  value="metrics" 
                  className="relative rounded-xl px-4 py-3 font-semibold text-sm transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Charts
                </TabsTrigger>
                <TabsTrigger 
                  value="comparison" 
                  className="relative rounded-xl px-4 py-3 font-semibold text-sm transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Comparison
                </TabsTrigger>
                <TabsTrigger 
                  value="tables" 
                  className="relative rounded-xl px-4 py-3 font-semibold text-sm transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Data Tables
                </TabsTrigger>
                <TabsTrigger 
                  value="rankings" 
                  className="relative rounded-xl px-4 py-3 font-semibold text-sm transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Top/Bottom
                </TabsTrigger>
                <TabsTrigger 
                  value="advanced" 
                  className="relative rounded-xl px-4 py-3 font-semibold text-sm transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced
                </TabsTrigger>
              </TabsList>

              <div className="space-y-6">
                <TabsContent value="metrics" className="space-y-6 mt-0">
                  <PowerCycleVsBarreCharts 
                    powerCycleData={transformedPowerCycleData}
                    barreData={transformedBarreData}
                  />
                </TabsContent>

                <TabsContent value="comparison" className="space-y-6 mt-0">
                  <PowerCycleVsBarreComparison 
                    powerCycleData={transformedPowerCycleData}
                    barreData={transformedBarreData}
                    onItemClick={handleItemClick}
                  />
                </TabsContent>

                <TabsContent value="tables" className="space-y-6 mt-0">
                  <PowerCycleVsBarreTables 
                    powerCycleData={transformedPowerCycleData}
                    barreData={transformedBarreData}
                    onRowClick={handleItemClick}
                  />
                </TabsContent>

                <TabsContent value="rankings" className="space-y-6 mt-0">
                  <PowerCycleVsBarreTopBottomLists 
                    powerCycleData={transformedPowerCycleData}
                    barreData={transformedBarreData}
                    onItemClick={handleItemClick}
                  />
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6 mt-0">
                  <PowerCycleVsBarreAdvancedMetrics 
                    data={transformedData}
                  />
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
                name: "PowerCycle Sessions",
                data: powerCycleData
              },
              {
                name: "Barre Sessions", 
                data: barreData
              }
            ]}
          />
        )}
      </div>
    </div>
  );
};

const PowerCycleVsBarreSectionWithProvider = () => {
  return (
    <SessionsFiltersProvider>
      <PowerCycleVsBarreSection />
    </SessionsFiltersProvider>
  );
};

export default PowerCycleVsBarreSectionWithProvider;
